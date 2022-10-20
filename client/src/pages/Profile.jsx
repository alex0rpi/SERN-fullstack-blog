import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  return (
    //   Show all the posts made by this current user.
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {}</h1>
      </div>
      <div className="listOfPosts"></div>
      {userId} Profile Page
    </div>
  );
};

export default Profile;
