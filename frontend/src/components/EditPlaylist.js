import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EditPlaylist = ({ playlist, onSave, onDelete }) => {
  const navigate = useNavigate(); // Initialize navigate
  const [playlistName, setPlaylistName] = useState(playlist ? playlist.name : '');
  const [playlistDescription, setPlaylistDescription] = useState(playlist ? playlist.description : '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'playlistName') {
      setPlaylistName(value);
    } else if (name === 'playlistDescription') {
      setPlaylistDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onSave && playlist) {
      try {
        const response = await fetch(`/api/playlists/${playlist._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: playlistName,
            description: playlistDescription,
          }),
        });

        if (!response.ok) {
          throw new Error('Error updating playlist');
        }

        const updatedPlaylist = await response.json();
        onSave(updatedPlaylist); // Call the onSave prop with the updated playlist
      } catch (error) {
        console.error('Error updating playlist:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (onDelete && playlist) {
      const playlistId = playlist?._id; // Use optional chaining here

      if (playlistId) {
        try {
          const response = await fetch(`/api/playlists/${playlistId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Error deleting playlist');
          }

          const data = await response.json();
          onDelete(playlistId); // Call onDelete prop to remove the playlist from state
          console.log(data.message); // Log success message
          
          // Redirect to home page after deletion
          navigate('/home'); // Change '/' to your desired home route
        } catch (error) {
          console.error('Error deleting playlist:', error);
        }
      } else {
        console.error('Playlist ID is undefined');
      }
    }
  };

  return (
    <div className="edit-playlist-component">
      <h2>Edit Playlist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="playlistName"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={handleChange}
          required
        />
        <textarea
          name="playlistDescription"
          placeholder="Playlist Description"
          value={playlistDescription}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleDelete} className="delete-button">
        Delete Playlist
      </button>
    </div>
  );
};

export default EditPlaylist;
