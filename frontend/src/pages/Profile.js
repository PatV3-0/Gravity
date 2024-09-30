import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import PlaylistsList from '../components/PlaylistsList';
import FollowersFollowing from '../components/Followers';
import CreatePlaylist from '../components/CreatePlaylist';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import UserContext

const ProfilePage = (props) => {
  const { currentUser, setCurrentUser } = useUser();
  const { userId } = useParams();
  const navigate = useNavigate(); // Use navigate from react-router
  
  const [user, setUser] = useState({ name: '', email: '', bio: '', friends: [] });
  const [playlists, setPlaylists] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false); // State to toggle the EditProfile component

  const fetchData = (userId) => {
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(userData => {
        fetch(`/api/playlists`)
          .then(response => response.json())
          .then(playlistsData => {
            const userPlaylists = playlistsData.filter(playlist => playlist.createdBy === userId);
            fetch(`/api/users`)
              .then(response => response.json())
              .then(allUsers => {
                const friendsList = userData.friends.map(friend => friend._id || friend);
                const friends = allUsers.filter(allUser => friendsList.includes(allUser._id.toString()));

                setUser(userData);
                setPlaylists(userPlaylists);
                setFriends(friends);
                setLoading(false);
                setIsCurrentUser(userId === props.loggedInUserId);
              })
              .catch(error => {
                console.error('Error fetching all users:', error);
                setError(error.message);
                setLoading(false);
              });
          });
      })
      .catch(error => {
        console.error('Error fetching user or playlists:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(userId);
  }, [userId]);

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
    setShowEditProfile(false);
  };

  const handleCreatePlaylist = () => {
    fetchData(userId);
  };

  const toggleEditProfile = () => {
    setShowEditProfile(prevShowEdit => !prevShowEdit);
  };

  const handleLogout = () => {
    setCurrentUser(null); // Make sure setCurrentUser is defined
    props.onLogout(); // Call any additional logout functions
    navigate('/'); // Redirect to homepage
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-page">
      <Profile user={user} />
      {isCurrentUser && (
        <>
          <button onClick={toggleEditProfile}>
            {showEditProfile ? 'Cancel Editing' : 'Edit Profile'}
          </button>
          <button onClick={handleLogout}>Log Out</button>
          {showEditProfile && (
            <EditProfile user={user} onSave={handleSaveProfile} />
          )}
        </>
      )}
      <PlaylistsList playlists={playlists} />
      <CreatePlaylist onCreate={handleCreatePlaylist} />
      <FollowersFollowing friends={friends} />
    </div>
  );
};

export default ProfilePage;
