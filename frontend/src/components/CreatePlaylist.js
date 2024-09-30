import React, { Component } from 'react';
import { useUser } from '../UserContext'; // Adjust the import path as necessary
import './CreatePlaylist.css';

const CreatePlaylist = ({ onCreate }) => {
  const { currentUser } = useUser(); // Access the current user
  const [playlistName, setPlaylistName] = React.useState('');
  const [description, setDescription] = React.useState(''); // Optional description field

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("User must be logged in to create a playlist");
      return;
    }

    // Create a new playlist through the API
    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser._id, // Use the current user's ID
          playlistName,
          description,
          dateCreated: new Date().toISOString(), // Include the current date in ISO format
        }),
      });

      if (response.ok) {
        const newPlaylist = await response.json();
        onCreate(newPlaylist); // Call onCreate to update the parent component state
        setPlaylistName(''); // Clear input
        setDescription(''); // Clear description
      } else {
        console.error('Failed to create playlist:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="create-playlist-component">
      <h2>Create Playlist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
