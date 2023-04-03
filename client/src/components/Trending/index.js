import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOP_TEN } from '../../utils/queries';

import TopTenGames from '../TopTenGames'


const Trending = () => {
  const { loading, data } = useQuery(GET_TOP_TEN);
  console.log('trending')
  const topTen = data?.topTen || [];

  return (
    <>
        {loading ? (
            // fix loading rendering on page
            <div>Loading...</div>
          ) : 
            (
              <TopTenGames
                games={topTen}
              />
            )

          }
    </>
  );
};

export default Trending;
