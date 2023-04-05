import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import Auth from '../../utils/auth';

const styles = {
  logo: {
    width: '150px'
  }
}

const Header = () => {
  const navigate = useNavigate();
  const [gameQuery, setGameQuery] = useState("");

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  function refreshHome() {
    
    navigate("/")
    navigate(0)
  }

  function refreshMe() {
    
    navigate("/me")
    navigate(0)
  }

  function handleInputChange(event) {
    setGameQuery(event.target.value);
  }

  // query the data we searched
  function handleSubmit(event) {
    event.preventDefault();
    // fetchGameDetails();
    navigate("/game?game="+gameQuery)
  }
  return (
    <>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5" style={{backgroundColor: 'rgb(130, 2, 99)'}}>
        <div className="flex flex-row justify-between items-center mx-auto">
          {/* logo */}
          <Link className="text-light items-center"  onClick={refreshHome}>
            <img src={logo} style={styles.logo}></img>
          </Link>

          {/* search bar */}
          <div className=" justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <form className="flex items-center" onSubmit={handleSubmit}>   
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-500">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input onChange={handleInputChange} type="text" id="simple-search" style={{width: '100%'}} className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black" placeholder="Search" required />
                </div>
            </form>
          </div>

          {/* login buttons*/}
          <div className="flex flex-row justify-items-center items-center lg:order-2">

            {Auth.loggedIn() ? (
            <>
              <Link className="text-light items-center" to="/api/games">
                <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
                  what2play
                </button>
              </Link>
              {/* <Link className="text-light items-center" onClick={refreshMe}> */}

              <Link className="text-light items-center" to="/me">
                <button onClick={refreshMe} className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
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
              <Link className="text-light self-center" to="/api/games">
                <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
                  what2play
                </button>
              </Link>
              <Link className="self-center text-light" to="/login">
                <button className="headerButton bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
                  Log in
                </button>
              </Link>
              <Link className="self-center text-light" to="/signup">
                <button className="headerButton bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
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
