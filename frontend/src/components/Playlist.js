import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../UserContext'; // Assuming you have a UserContext
import Song from './Song';
import AddSongToPlaylist from './AddSongToPlaylist';
import EditPlaylist from './EditPlaylist'; // Import the EditPlaylist component

const Playlist = () => {
  const { id } = useParams(); // Get playlist id from the URL
  const { currentUser } = useUser(); // Get the current user from context
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddSongForm, setShowAddSongForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // State to show edit form

  // Fetch playlist and songs data on mount
  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const playlistResponse = await fetch(`/api/playlists/${id}`);
        if (!playlistResponse.ok) {
          throw new Error(`Error fetching playlist: ${playlistResponse.statusText}`);
        }

        const playlistData = await playlistResponse.json();
        const songResponse = await fetch('/api/songs');
        if (!songResponse.ok) {
          throw new Error(`Error fetching songs: ${songResponse.statusText}`);
        }

        const allSongs = await songResponse.json();
        const playlistSongs = playlistData.songs
          .map(songId => allSongs.find(song => song._id === songId))
          .filter(song => song !== undefined);

        setPlaylist(playlistData);
        setSongs(playlistSongs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Error loading playlist or songs');
        setLoading(false);
      }
    };

    fetchPlaylistData();
  }, [id]);

  const handleAddSongClick = () => {
    setShowAddSongForm(true);
  };

  const handleCancelAddSong = () => {
    setShowAddSongForm(false);
  };

  const handleAddSongSubmit = (songDetails) => {
    setShowAddSongForm(false);
    console.log("New song details:", songDetails);
  };

  const handleEditPlaylistClick = () => {
    setShowEditForm(true);
  };

  const handleSavePlaylist = (updatedPlaylist) => {
    setPlaylist(updatedPlaylist);
    setShowEditForm(false);
  };

  const handleDelete = async (id) => {
    // Your logic to delete the playlist
    console.log(`Deleting playlist with ID: ${id}`);
    // You can add your API call to delete the playlist here
  };

  // Check if the current user is the owner of the playlist
  const isOwner = playlist?.createdBy === currentUser?._id;

  if (loading) {
    return <div>Loading playlist...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="playlist-component">
      <h2>{playlist.name}</h2>
      <p>{playlist.description}</p>

      {isOwner && (
        <>
          <button onClick={handleEditPlaylistClick}>Edit Playlist</button>
          <button onClick={handleAddSongClick}>Add Song</button>
        </>
      )}

      <h3>Songs</h3>
      <ul>
        {songs.length > 0 ? (
          songs.map((song) => (
            <li key={song._id}>
              <Song {...song} />
            </li>
          ))
        ) : (
          <p>No songs in this playlist.</p>
        )}
      </ul>

      {showAddSongForm && (
        <AddSongToPlaylist
          onCancel={handleCancelAddSong}
          onSubmit={handleAddSongSubmit}
        />
      )}

      {showEditForm && (
        <EditPlaylist
          playlist={playlist}
          onSave={handleSavePlaylist}  // Updated to use the correct function
          onDelete={handleDelete}      // Ensure this is defined
        />
      )}
    </div>
  );
};

export default Playlist;
