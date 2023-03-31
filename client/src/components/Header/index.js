import React from 'react';
import { Link } from 'react-router-dom';
import '../../dist/output.css'
// import '../../index.css'
// import './styles.css'
import logo from '../images/logo.png'

import Auth from '../../utils/auth';

const styles = {
  logo: {
    // backgroundColor: 'rgb(130,2,99)',
    width: '150px'
  }
}

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <>
    <div className="flex flex-row flex-wrap" style={{backgroundColor: 'rgb(130, 2, 99)'}}>
      <div>
        <img src={logo} style={styles.logo}></img>
      </div>

      <div style={{width: '50%'}}>
        <form className="justify-center place-items-center">   
          <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />

          {/* <label for="simple-search" class="sr-only">Search</label> */}
          {/* <div className="relative w-full"> */}
              {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div> */}
          {/* </div> */}
          {/* <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span className="sr-only">Search</span>
          </button> */}
      </form>

      </div>

      <div>
        {/* login */}
      </div>
      {/* <div>
        
      </div>
        Login buttons
      <div>

      </div> */}
    </div>
      {/* <header className="flex flex-row" style={{backgroundColor: 'rgb(130, 2, 99)'}}>
        <div className="container flex-row justify-space-between-lg justify-center align-center">
          <div>
            <img src={logo}></img>
            <h1> hellow</h1>
          </div>
        </div>
      </header> */}
     
    </>
  //   <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
  //     <div className="container flex-row justify-space-between-lg justify-center align-center">
  //       <div>
  //         <Link className="text-light" to="/">
  //           <h1 className="m-0">Tech Thoughts</h1>
  //         </Link>
  //         <p className="m-0">Get into the mind of a programmer.</p>
  //       </div>
  //       <div>
  //         {Auth.loggedIn() ? (
  //           <>
  //             <Link className="btn btn-lg btn-info m-2" to="/me">
  //               {Auth.getProfile().data.username}'s profile
  //             </Link>
  //             <button className="btn btn-lg btn-light m-2" onClick={logout}>
  //               Logout
  //             </button>
  //           </>
  //         ) : (
  //           <>
  //             <Link className="btn btn-lg btn-info m-2" to="/login">
  //               Login
  //             </Link>
  //             <Link className="btn btn-lg btn-light m-2" to="/signup">
  //               Signup
  //             </Link>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   </header>
  );
};

export default Header;
