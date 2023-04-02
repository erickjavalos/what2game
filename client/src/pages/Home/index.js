import React from 'react';
import './styles.css'
import QuickLinks from '../../components/Quicklinks'
const Home = () => {
  // TODO: add states to keep track on button click state on Quicklink


  return (
    <>
      {/* buttons for quick games  */}
      <QuickLinks />
      {/* divider */}
      <div className="drawLine" style={{width: '100%'}}></div>
      {/* TODO: add ternary operator to render either trending component or genre component 
        ex.
        {buttonState === 'trending'? {<Trending />} : {<Genre />}}
      */}

    </>
  );
};

export default Home;
