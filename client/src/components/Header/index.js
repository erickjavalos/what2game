import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
      
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  Find a Game
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/genres">
                  Search Genres
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/streams">
                  Streams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reviews">
                  Game Reviews
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recommendations">
                  Recommend a Game
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;


