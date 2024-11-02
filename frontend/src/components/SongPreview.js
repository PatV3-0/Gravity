import React, { useEffect, useState } from 'react';
import { useUser } from '../userContext';

const SongPreview = ({ song }) => {
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [error, setError] = useState(null);
  
  const { currentUser } = useUser();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch('/api/playlists');
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
      const playlistsData = await response.json();
      const filtered = filterPlaylists(playlistsData, currentUser);
      setPlaylists(playlistsData);
      setFilteredPlaylists(filtered);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setError('Failed to fetch playlists');
    }
  };

  const filterPlaylists = (playlists, currentUser) => {
    if (!currentUser) {
      console.warn('Current user is not defined. Returning empty playlist filter.');
      return [];
    }

    if (currentUser.admin === "true") {
      return playlists;
    }

    const currentUserIdStr = currentUser._id.toString();
    return playlists.filter(playlist => playlist.createdBy === currentUserIdStr);
  };

  const handleSelectPlaylist = (e) => {
    setSelectedPlaylistId(e.target.value);
  };

  const handleAddToPlaylist = async () => {
    if (!selectedPlaylistId) {
      alert('Please select a playlist to add the song to.');
      return;
    }

    try {
      const response = await fetch(`/api/playlists/${selectedPlaylistId}/add-song`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId: song._id }),
      });

      if (response.ok) {
        alert('Song added to playlist successfully!');
      } else {
        const errorMessage = await response.text();
        alert(`Failed to add song to playlist: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      alert('Failed to add song to playlist.');
    }
  };

  if (!song) {
    return null;
  }

  return (
    <div className="song-preview">
      <h4>{song.name}</h4>
      <p>{song.artist}</p>
      {error && <p className="error">{error}</p>}

      <select value={selectedPlaylistId} onChange={handleSelectPlaylist}>
        <option value="">Select a Playlist</option>
        {filteredPlaylists.map(playlist => (
          <option key={playlist._id} value={playlist._id}>
            {playlist.name}
          </option>
        ))}
      </select>

      <button type="button" onClick={handleAddToPlaylist}>
        Add to Playlist
      </button>
    </div>
  );
};

export default SongPreview;
