import React from 'react';
import './styles.css'
import QuickLinks from '../../components/Quicklinks'
const Home = () => {

  return (
    <>
      {/* buttons for quick games  */}
      <QuickLinks />
      {/* divider */}
      <div className="drawLine" style={{width: '100%'}}></div>
    </>
  );
};

export default Home;
