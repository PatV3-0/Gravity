import React, { useState, useEffect } from 'react';
import PlaylistsList from '../components/PlaylistsList';
import CreatePlaylist from '../components/CreatePlaylist'; // Import CreatePlaylist
import { useParams } from 'react-router-dom';
import { useUser } from '../userContext';

const LibraryPage = () => {
  const { currentUser } = useUser(); 
  const { userId } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`/api/playlists`);
      const playlistsData = await response.json();
      const userPlaylists = playlistsData.filter(playlist => playlist.createdBy === userId);
      setPlaylists(userPlaylists);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Function to handle creating a new playlist
  const handleCreatePlaylist = async(newPlaylist) => {
    await fetchPlaylists();
  };

  useEffect(() => {
    fetchPlaylists();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="library-page">
      <h1>User Playlists</h1>
      {currentUser && (
        <CreatePlaylist onCreate={handleCreatePlaylist} /> // Place CreatePlaylist at the top
      )}
      <PlaylistsList playlists={playlists} />
    </div>
  );
};

export default LibraryPage;
