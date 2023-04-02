const fetch = require('node-fetch');
const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config()
import { API_KEY } from "../../client/src/components/config/config";

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

const fetchGame = async (id) => {
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  const json = await response.json();
  return json;
};
const fetchGamesBySearch = async (query) => {
  const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`);
  const json = await response.json();
  return json.results;
};
const fetchGenres = async () => {
  const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}&ordering=-games_count&page_size=10`);
  const json = await response.json();
  return json.results;
};
const resolvers = {
  Query: {
    async genres() {
      const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}&ordering=-games_count&page_size=10`);
      const json = await response.json();
      return json.results;
    },
    async game(parent, { id }, context, info) {
      const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      const json = await response.json();
      return json;
    },
    async search(parent, { query }, context, info) {
      const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`);
      const json = await response.json();
      return json.results;
    },
    
    async topTen() {

      const endpoint = "https://api.twitch.tv/helix/games/top?first=20";
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
      
    },
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  // TODO: update this with new material
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
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
