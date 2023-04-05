import React from 'react';
import { useState, useEffect } from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/SignUp/Signup';
import Login from './pages/Login/Login';
import Header from './components/Header';
import What2Play from './pages/What2Play/What2Play';
import Profile from './pages/Profile/Profile';
import Game from './pages/Game';



import './dist/output.css'
import './index.css'


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
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
          <AppRoutes />
        </Router>
      </ApolloProvider>
    );
  // }

}


function AppRoutes() {

  return (
    <div className="flex flex-col">
      <Header />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/api/games" element={<What2Play />} />
          <Route
            path="/me"
            element={<Profile />}
          />
           <Route
            path="/game"
            element={<Game />}
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;
