import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import LikedGames from '../../components/LikedGames'
import {QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME);
  console.log('queried')
  // console.log(data)

  const liked = data?.me
  // console.log(liked.likes)
  if (loading) {
    return <div>Loading...</div>;
  }

  else if (!Auth.loggedIn()) {
    return (
      <h4 className='text-white text-center m-3 text-2xl'>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  return (
    <>

    {loading ? (
          // fix loading rendering on page
          <div>Loading...</div>
            ) : 
          (
            <LikedGames
              games={liked.likes}
            />
          )

        }

    </>

        
        // {/* <div className="col-12 col-md-10 mb-5">
        //   <ThoughtList
        //     thoughts={user.thoughts}
        //     title={`${user.username}'s thoughts...`}
        //     showTitle={false}
        //     showUsername={false}
        //   />
        // </div>
        // {!userParam && (
        //   <div
        //     className="col-12 col-md-10 mb-3 p-3"
        //     style={{ border: '1px dotted #1a1a1a' }}
        //   >
        //     <ThoughtForm />
        //   </div> */}
        // {/* )} */}
    //   </div>
    // </div>
  );
};

export default Profile;
