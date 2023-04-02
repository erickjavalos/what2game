import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login/Login';
import Header from './components/Header';
import What2Play from './pages/What2Play/What2Play';

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
        <div className="flex flex-col">
          <Header />
           <div className="">
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
              <Route 
                path="/login" 
                element={<Login />}
              />
              <Route 
                path="/signup" 
                element={<Signup />}
              />

              <Route 
                path="/api/games" 
                element={<What2Play />}
              />  
              {/* <Route 
                path="/signup" 
                element={<Signup />}
              />
              <Route 
                path="/me" 
                element={<Profile />}
              />
              <Route 
                path="/profiles/:username" 
                element={<Profile />}
              />
              <Route 
                path="/thoughts/:thoughtId" 
                element={<SingleThought />}
              />
              <Route 
                path="/game/:gameId" 
                element={<GameDetails />}
              />
              <Route 
                path="/game/:gameId/reviews" 
                element={<GameReviews />}
              />
              <Route 
                path="/genres" 
                element={<Genres />}
              />
              <Route 
                path="/search" 
                element={<SearchGame />}
              />
              <Route 
                path="/streams" 
                element={<Streams />}
              /> */}
            </Routes>
          </div>
        </div>

      </Router>
    </ApolloProvider>
  
   
  );
}

export default App;
