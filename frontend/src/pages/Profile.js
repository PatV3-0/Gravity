import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import PlaylistsList from '../components/PlaylistsList';
import FollowersFollowing from '../components/Followers';
import CreatePlaylist from '../components/CreatePlaylist';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../userContext';
import fallbackImage from '../components/user.png';

const ProfilePage = (props) => {
  const { currentUser, setCurrentUser } = useUser();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [savedPlaylists, setSavedPlaylists] = useState([]); // State for saved playlists
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isAdmin, setIsAdmin] = useState(currentUser && currentUser.admin === 'true'); // Assuming user roles are defined

  const fetchData = async (userId) => {
    try {
      setLoading(true);

      // Fetch user data
      const userResponse = await fetch(`/api/users/${userId}`);
      if (!userResponse.ok) throw new Error('Error fetching user data');
      const userData = await userResponse.json();

      // Fetch playlists data
      const playlistsResponse = await fetch(`/api/playlists`);
      if (!playlistsResponse.ok) throw new Error('Error fetching playlists');
      const playlistsData = await playlistsResponse.json();
      const userPlaylists = playlistsData.filter(playlist => playlist.createdBy === userId);

      // Fetch saved playlists
      const savedPlaylistsResponse = await fetch(`/api/users/${userId}/savedPlaylists`);
      if (!savedPlaylistsResponse.ok) throw new Error('Error fetching saved playlists');
      const savedPlaylistsData = await savedPlaylistsResponse.json();

      // Fetch all users to find following and followers
      const usersResponse = await fetch(`/api/users`);
      if (!usersResponse.ok) throw new Error('Error fetching all users');
      const allUsers = await usersResponse.json();

      const followingList = userData.following.map(id => id._id || id);
      const followersList = userData.followers.map(id => id._id || id);

      const following = allUsers.filter(user => followingList.includes(user._id.toString()));
      const followers = allUsers.filter(user => followersList.includes(user._id.toString()));

      setUser(userData);
      setPlaylists(userPlaylists);
      setSavedPlaylists(savedPlaylistsData); // Set saved playlists
      setFollowing(following);
      setFollowers(followers);
      setIsCurrentUser(userId === props.loggedInUserId);

      // Check if the current user is in the following list
      setIsFriend(currentUser && followersList.includes(currentUser._id));
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(userId);
  }, [userId]);

  const handleSaveProfile = (updatedUser) => {
    fetchData(userId);
    setShowEditProfile(false);
  };

  const handleCreatePlaylist = () => {
    fetchData(userId);
  };

  const toggleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    props.onLogout();
    navigate('/');
  };

  const handleFriendToggle = async () => {
    const url = isFriend ? `/api/unfriend/${userId}` : `/api/friend/${userId}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUserId: currentUser._id }),
      });
      if (!response.ok) throw new Error('Error updating friend status');
      const updatedUser = await response.json();

      setCurrentUser(updatedUser);
      setIsFriend(!isFriend);
    } catch (error) {
      console.error(`Error ${isFriend ? 'unfriending' : 'friending'} user:`, error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
  <div className="profile-page">
    <div className="user-image">
      {/* Display user image or fallback image */}
      <img
        src={user.profileImage || fallbackImage}
        alt={`${user.name || 'User'}'s profile`}
        onError={(e) => { e.target.src = fallbackImage }} // Fallback on error
        style={{ width: '300px', height: '300px' }}
      />
    </div>

    <Profile user={user} />

    {/* Check if the user is the current user or an admin */}
    {isCurrentUser || isAdmin ? (
      <>
        <button onClick={toggleEditProfile}>
          {showEditProfile ? 'Cancel Editing' : 'Edit Profile'}
        </button>
        <button onClick={handleLogout}>Log Out</button>
        {showEditProfile && (
          <EditProfile user={user} onSave={handleSaveProfile} />
        )}
        <PlaylistsList playlists={playlists} title="Playlists" />
        <PlaylistsList playlists={savedPlaylists} title="Saved Playlists" />
        
        {/* Show CreatePlaylist only if the user has no playlists */}
        {isCurrentUser && playlists.length === 0 && (
          <CreatePlaylist onCreate={handleCreatePlaylist} />
        )}
        
        <FollowersFollowing following={following} followers={followers} />
      </>
    ) : (
      <>
        {/* Display basic data and follow button for non-friends */}
        <button onClick={handleFriendToggle}>
          {isFriend ? 'Unfollow' : 'Follow'}
        </button>
        {isFriend && (
          <>
            <PlaylistsList playlists={playlists} />
            <FollowersFollowing following={following} followers={followers} />
          </>
        )}
      </>
    )}
  </div>
);

};

export default ProfilePage;
