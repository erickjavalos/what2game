const fetch = require('node-fetch');

const resolvers = {
  Query: {
    async genres() {
      const response = await fetch('https://api.rawg.io/api/genres?key=df0a6dbf13504aefb411f7298892a149&ordering=-games_count&page_size=10');
      const json = await response.json();
      return json.results;
    },
  },

  Query: {
    searchGames: async (parent, { query }) => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=df0a6dbf13504aefb411f7298892a149&search=${query}`);
        return response.data.results;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  }
};


module.exports = resolvers;
