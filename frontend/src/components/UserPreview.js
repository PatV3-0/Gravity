import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './UserPreview.css';
import fallbackImage from './user.png';

const getGoogleDriveImage = (url) => {
  const match = url.match(/file\/d\/(.+?)\/view/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};

const UserPreview = ({ user }) => {
  const { _id, username = 'Unknown User', profileImage, name = 'No Name' } = user || {}; 
  const navigate = useNavigate();  

  const handleViewProfile = (userId) => {
  navigate(`/profile/${userId}`);
};


  return (
    <div className="user-preview">
      <img
        src={getGoogleDriveImage(profileImage || fallbackImage)} 
        alt={`${username}'s profile`} 
        className="profile-image"
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = fallbackImage;
        }}
      />
      <div className="user-details">
        <h4>{username}</h4>
        <p>{name}</p>
      </div>
      <button onClick={() => handleViewProfile(_id)}>View Profile</button>
    </div>
  );
};

export default UserPreview;
