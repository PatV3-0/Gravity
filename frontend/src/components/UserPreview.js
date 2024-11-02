import React from 'react';
import { useNavigate } from 'react-router-dom';
import fallbackImage from './user.png';

const UserPreview = ({ user }) => {
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
    <div className="user-preview">
      <img
        src={profileImage || fallbackImage}
        alt={`${username}'s profile`}
        className="profile-image"
        onError={(e) => {
          setTimeout(() => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }, 500);
        }}
      />
      <div className="user-details">
        <h4>{username}</h4>
        <p>{name}</p>
      </div>
      <button onClick={handleViewProfile}>View Profile</button>
    </div>
  );
};

export default UserPreview;
