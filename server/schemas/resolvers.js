const fetch = require('node-fetch');
const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config()

let clientId = process.env.CLIENT_ID;
let clientSecret =  process.env.TWITCH_SECRET;

// twitch authorization request
function getTwitchAuthorization() {
  // grab secrets
  let url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

  return fetch(url, {
  method: "POST",
  })
  .then((res) => res.json())
  .then((data) => {
      return data;
  });
}

async function getHeaders()
{
    let authorizationObject = await getTwitchAuthorization();

    let { access_token, expires_in, token_type } = authorizationObject;

    //token_type first letter must be uppercase    
    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${access_token}`;

    let headers = {
      authorization,
      "Client-Id": clientId,
    };
    return headers
    
}

async function getTopGamesUnmerged(headers) {

  const endpoint = "https://api.twitch.tv/helix/games/top?first=20"

  const response = await fetch(endpoint, {
    headers,
  })
  // get json response 
  const json = await response.json()

  // filter out top ten games that have valid igdb ids
  let cnt = 0;
  let dataRtn = []
  for (let i =0; i < json.data.length; i++)
  {
    if (cnt >= 10)
    {
      i = json.data.length + 1
    }
    else if (json.data[i].igdb_id !== "")
    {
      // console.log(json.data[i])
      dataRtn.push(json.data[i])
      cnt += 1;
    }
  }
  // return the data to graphql
  return dataRtn
}


async function getLikedGames(liked, headers)
{
    // get top ten games data
    let formatedData = []
    count = 0;
    await Promise.all(liked.map(async (like) => {
        const gameEndpoint = `https://api.igdb.com/v4/games/${like}?fields=name,cover,genres,rating`
        const response = await fetch(gameEndpoint, {
            headers,
        })
        // get game json response 
        const game = await response.json()
        const genreValid = game[0]?.genres || -1;
        // evaluate genre if it exists
        let genre = ''
        if (genreValid !== -1){
            //  get 1st genre name from endpoint 
            const genreEndpoint = `https://api.igdb.com/v4/genres/${game[0].genres[0]}?fields=name`
            const genreResp = await fetch(genreEndpoint, {
                headers,
            })
            // // get json response 
            const genreName = await genreResp.json()
            console.log('genrename')
            console.log(genreName)
            // assign genre
            genre = genreName[0]?.name || "null"

        }
        // if genre array is empty, return null
        else {
            genre = 'null'

        }

        // get cover art 
        const coverValid = game[0]?.cover || -1;
        // evaluate genre if it exists
        let coverUrl = ''
        if (coverValid !== -1){
            //  get 1st genre name from endpoint 
            const coverEndpoint = `https://api.igdb.com/v4/covers/${game[0].cover}?fields=url`
            const coverResp = await fetch(coverEndpoint, {
                headers,
            })
            // // get json response 
            const coverData = await coverResp.json()
            // assign genre
            coverUrl = coverData[0].url.split("//")[1]

        }
        // if genre array is empty, return null
        else {
            coverUrl = 'null'

        }

        // console.log(game[0].name)
        // get cover art url
        formatedData.push({
            id: count,
            name: game[0].name,
            box_art_url: coverUrl,
            genre: genre,
            rating: game[0]?.rating || "null",
            igdb_id: like
        })
        count +=1;
    }))
    return formatedData
}

async function format(topTen, headers)
{
      // get top ten games data
    let formatedData = []
    count = 0;
    // iterate through each top game and get genres, rating, platforms
    await Promise.all(topTen.map(async (ele) => {
        const gameEndpoint = `https://api.igdb.com/v4/games/${ele.igdb_id}?fields=genres,rating`
        const response = await fetch(gameEndpoint, {
            headers,
        })
        // // get game json response 
        const game = await response.json()
        const genreValid = game[0]?.genres || -1;
        // evaluate genre if it exists
        let genre = ''
        if (genreValid !== -1){
            //  get 1st genre name from endpoint 
            const genreEndpoint = `https://api.igdb.com/v4/genres/${game[0].genres[0]}?fields=name`
            const genreResp = await fetch(genreEndpoint, {
                headers,
            })
            // // get json response 
            const genreName = await genreResp.json()
            // assign genre
            genre = genreName[0]?.name || "null"

        }
        // if genre array is empty, return null
        else {
            genre = 'null'

        }
        // fix box url 
        const urlSplit = ele.box_art_url.split("{width}x{height}")
        const art = urlSplit[0] + '300x300' + urlSplit[1]
        formatedData.push({
            id: count,
            name: ele.name,
            box_art_url: art,
            genre: genre,
            rating: game[0]?.rating || "null",
            igdb_id: ele.igdb_id
        })
        count += 1;

    }));

    return formatedData
}

const fetchGame = async (id) => {
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=df0a6dbf13504aefb411f7298892a149`);
  const json = await response.json();
  return json;
};
const fetchGamesBySearch = async (query) => {
  const response = await fetch(`https://api.rawg.io/api/games?key=df0a6dbf13504aefb411f7298892a149&search=${query}`);
  const json = await response.json();
  return json.results;
};
const fetchGenres = async () => {
  const response = await fetch('https://api.rawg.io/api/genres?key=df0a6dbf13504aefb411f7298892a149&ordering=-games_count&page_size=10');
  const json = await response.json();
  return json.results;
};
const resolvers = {
  Query: {
    async genres() {
      const response = await fetch('https://api.rawg.io/api/genres?key=df0a6dbf13504aefb411f7298892a149&ordering=-games_count&page_size=10');
      const json = await response.json();
      return json.results;
    },
    async game(parent, { id }, context, info) {
      const response = await fetch(`https://api.rawg.io/api/games/${id}?key=df0a6dbf13504aefb411f7298892a149`);
      const json = await response.json();
      return json;
    },
    async search(parent, { query }, context, info) {
      const response = await fetch(`https://api.rawg.io/api/games?key=df0a6dbf13504aefb411f7298892a149&search=${query}`);
      const json = await response.json();
      return json.results;
    },
    async topTen() {
      // get auth token
      let headers = await getHeaders()
      // retreive top ten games
      let topTenUM = await getTopGamesUnmerged(headers)
      // get logo information
      let topTen = await format(topTenUM, headers)

      return topTen
    },
  
    users: async () => {
      return User.find().populate('likes');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('likes');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('likes');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    likedGames: async (parent, args, context) => {
      // verify they are signed in
      if (context.user) {
        let data = await User.findOne({ _id: context.user._id })
        // get auth token
        let headers = await getHeaders()
        // get logo information
        let likes = await getLikedGames(data.likes, headers)
        console.log(likes)
        
        return likes
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  // TODO: update this with new material
  Mutation: {
    addUser: async (parent, { username, email, password, fullName }) => {
      const user = await User.create({ username, email, password, fullName });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // addThought: async (parent, { thoughtText }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.create({
    //       thoughtText,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};
    // Query: {
    //   async streams(parent, { id }, context, info) {
    //     const response = await fetch(`https://api.twitch.tv/helix/streams?game_id=${id}`, {
    //       headers: {
    //         'Client-ID': 'YOUR_TWITCH_CLIENT_ID',
    //         Authorization: `Bearer YOUR_TWITCH_ACCESS_TOKEN`,
    //       },
    //     });
    //     const json = await response.json();
    //     return json.data;
    //   },
    // },


module.exports = resolvers;
