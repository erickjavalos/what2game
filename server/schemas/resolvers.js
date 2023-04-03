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
    // added for What2Play component
    async recommendedGames(parent, { genres, platforms, esrb_rating }, context, info) {
      const params = new URLSearchParams({
        key: 'df0a6dbf13504aefb411f7298892a149',
        ...(genres ? { genres } : {}),
        ...(platforms ? { platforms } : {}),
        ...(esrb_rating ? { esrb_rating } : {}),
      });
      const response = await fetch(`https://api.rawg.io/api/games?${params.toString()}`);
      const json = await response.json();
      const games = json.results;
      const gameDetailsPromises = games.map(async (game) => {
        const gameDetailsResponse = await fetch(`https://api.rawg.io/api/games/${game.id}?key=df0a6dbf13504aefb411f7298892a149`);
        const gameDetailsJson = await gameDetailsResponse.json();
        return gameDetailsJson;
      });
      const gamesWithDetails = await Promise.all(gameDetailsPromises);
      return gamesWithDetails;
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
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    // users: async () => {
    //   return User.find().populate('thoughts');
    // },
    // user: async (parent, { username }) => {
    //   return User.findOne({ username }).populate('thoughts');
    // },
    // thoughts: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Thought.find(params).sort({ createdAt: -1 });
    // },
    // thought: async (parent, { thoughtId }) => {
    //   return Thought.findOne({ _id: thoughtId });
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  // TODO: update this with new material
  Mutation: {
    // addUser: async (parent, { username, email, password }) => {
    //   const user = await User.create({ username, email, password });
    //   const token = signToken(user);
    //   return { token, user };
    // },
    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     throw new AuthenticationError('No user found with this email address');
    //   }

    //   const correctPw = await user.isCorrectPassword(password);

    //   if (!correctPw) {
    //     throw new AuthenticationError('Incorrect credentials');
    //   }

    //   const token = signToken(user);

    //   return { token, user };
    // },
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
