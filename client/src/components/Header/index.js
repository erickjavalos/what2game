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
    <div class="flex flex-row flex-wrap" style={{backgroundColor: 'rgb(130, 2, 99)'}}>
      <div>
        <img src={logo} style={styles.logo}></img>
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
