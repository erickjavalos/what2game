import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../../components/ThoughtList';
import ThoughtForm from '../../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <>
      <div style={{backgroundColor: 'rgb(46,41,78)'}}>

      </div>
    </>
  );
};

export default Home;
