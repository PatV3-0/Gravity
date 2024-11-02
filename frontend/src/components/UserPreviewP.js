import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import fallbackImage from './user.png';

const UserPreviewP = ({ user }) => {
  const {
    _id = {},
    username = 'Unknown User',
    profileImage,
    name = 'No Name',
  } = user || {};

  const userId = _id.$oid || _id;
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="user-previewp">
      <img
        src={profileImage || fallbackImage}
        alt={`${username}'s profile`}
        className="profile-imagep"
        onError={(e) => {
          setTimeout(() => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }, 500);
        }}
      />
      <div className="user-detailsp">
        <h4>@{username}</h4>
        <p>{name}</p>
        <button onClick={handleViewProfile}>View Profile</button>
      </div>
    </div>
  );
};

export default UserPreviewP;
