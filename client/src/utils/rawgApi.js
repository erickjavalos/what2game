// utils/rawgApi.js

const API_BASE_URL = 'https://api.rawg.io/api/games';

export const fetchData = async (query) => {
  const response = await fetch(`${API_BASE_URL}?${query}`);
  const data = await response.json();
  return data.results;
};
