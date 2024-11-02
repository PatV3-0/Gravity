import React, { useState, useEffect } from 'react';
import PlaylistsList from '../components/PlaylistsList';
import CreatePlaylist from '../components/CreatePlaylist';
import { useParams } from 'react-router-dom';
import { useUser } from '../userContext';
import backsplash from '../../public/assets/images/backing.png';

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

  const handleCreatePlaylist = async(newPlaylist) => {
    await fetchPlaylists();
  };

  useEffect(() => {
    fetchPlaylists();
  }, [userId]);

  if (loading) {
    return <div className="error">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="library-page" style={{ backgroundImage: `url(${backsplash})` }}>
      {currentUser && (
        <CreatePlaylist onCreate={handleCreatePlaylist} /> // Place CreatePlaylist at the top
      )}
      <PlaylistsList playlists={playlists} />
    </div>
  );
};

export default LibraryPage;
