import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import Auth from '../../utils/auth';
import GameDetails from '../GameDetails';

const styles = {
  logo: {
    width: '150px'
  }
}

const Header = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  function refreshHome() {
    navigate("/")
    navigate(0)
  }

  function refreshMe() {
    console.log('refreshed')
    navigate("/me")
    navigate(0)
  }
  return (
    <>
 <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5" style={{backgroundColor: 'rgb(130, 2, 99)'}}>
  <div className="flex flex-wrap justify-between items-center mx-auto">
    {/* logo */}
    {/* <Link className="text-light items-center" onClick={refreshHome}> */}
    <Link className="text-light items-center" onClick={refreshHome}>
      <img src={logo} style={styles.logo} />
    </Link>
    <GameDetails game={{ name: 'Game Name', released: 'Release Date', rating: 'Rating' }} />
    {/* login buttons*/}
    <div className="flex items-center lg:order-2">
      {Auth.loggedIn() ? (
        <>
          <Link className="text-light items-center" to="/api/games">
            <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
              what2play
            </button>
          </Link>
          {/* <Link className="text-light items-center" onClick={refreshMe}> */}
          <Link className="text-light items-center" to="/me">
            <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
              {Auth.getProfile().data.username}'s profile
            </button>
          </Link>
          <Link className="text-light items-center" to="/">
            <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2" onClick={logout}>
              Logout
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link className="text-light items-center" to="/api/games">
            <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
              what2play
            </button>
          </Link>
          <Link className="text-light items-center" to="/login">
            <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
              Log in
            </button>
          </Link>
          <Link className="text-light items-center" to="/signup">
            <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
              Sign up
            </button>
          </Link>
        </>
      )}
    </div>
  </div>
</nav>

    </>
  );
};

export default Header;
