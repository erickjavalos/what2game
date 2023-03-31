const fetch = require('node-fetch');

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
  },
    Query: {
      async game(parent, { id }, context, info) {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=df0a6dbf13504aefb411f7298892a149`);
        const json = await response.json();
        return json;
      },
    },
    Query: {
      async search(parent, { query }, context, info) {
        const response = await fetch(`https://api.rawg.io/api/games?key=df0a6dbf13504aefb411f7298892a149&search=${query}`);
        const json = await response.json();
        return json.results;
      },
    },
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
};

module.exports = resolvers;
