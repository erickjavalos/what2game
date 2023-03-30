import React, { useState } from "react";
import { API_KEY } from './config';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Genres from "./components/Genres";
import APIKeyContext from "./APIKeyContext";
import GameDetails from "./components/GameDetails";
import GameReviews from "./components/GameReviews";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [selectedGameSlug, setSelectedGameSlug] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY; // Replace with your API key

  const handleGameSelection = (gameSlug) => {
    setSelectedGameSlug(gameSlug);
  };

  return (
    <APIKeyContext.Provider value={API_KEY}>
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Genres" element={<Genres handleGameSelection={handleGameSelection} />} />
              </Routes>
            </div>
            <Footer />
          </div>
          {selectedGameSlug && (
            <div>
              <GameDetails gameSlug={selectedGameSlug} />
              <GameReviews gameSlug={selectedGameSlug} apiKey={API_KEY} />
            </div>
          )}
        </Router>
      </ApolloProvider>
    </APIKeyContext.Provider>
  );
}

export default App;
