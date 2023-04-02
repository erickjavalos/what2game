import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GameDetails from "./components/GameDetails";
import GameReviews from "./components/GameReviews";
import Genres from "./components/Genres";
import SearchGame from "./components/SearchGame";
import Streams from "./components/Streams";

import "./dist/output.css";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
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
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex flex-col">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/profiles/:username" element={<Profile />} />
              <Route path="/thoughts/:thoughtId" element={<SingleThought />} />
              <Route path="/game/:gameSlug" element={<GameDetails />} />
              <Route path="/game/:gameSlug/reviews" element={<GameReviews />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/search" element={<SearchGame />} />
              <Route path="/streams" element={<Streams />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
