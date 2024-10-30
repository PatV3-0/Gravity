import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditPlaylist = ({ playlist, onSave, onDelete, fetchPlaylistData, onDelete }) => {
  const navigate = useNavigate();
  const [playlistName, setPlaylistName] = useState(playlist ? playlist.name : '');
  const [playlistDescription, setPlaylistDescription] = useState(playlist ? playlist.description : '');
  const [tags, setTags] = useState(playlist ? playlist.tags : ''); 
  const [genre, setGenre] = useState(playlist ? playlist.genre : '');
  const [playlistArt, setPlaylistArt] = useState(playlist ? playlist.playlistArt : ''); 
  const [hasSaved, setHasSaved] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'playlistName':
        setPlaylistName(value);
        break;
      case 'playlistDescription':
        setPlaylistDescription(value);
        break;
      case 'tags':
        setTags(value); 
        break;
      case 'genre':
        setGenre(value); 
        break;
      case 'playlistArt':
        setPlaylistArt(value); 
        break;
      default:
        break;
    }
  };

  // Handle form submission for updating the playlist
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onSave && playlist && !hasSaved) {
      try {
        const response = await fetch(`/api/playlists/${playlist._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: playlistName,
            description: playlistDescription,
            tags: tags, 
            genre: genre, 
            playlistArt: playlistArt, 
          }),
        });

        if (response.ok) {
          const updatedPlaylist = await response.json();
          onSave(updatedPlaylist);
          setHasSaved(true);
          fetchPlaylistData();
        } else {
          console.error('Failed to update playlist');
          const updatedPlaylist = await response.json();
        }
      } catch (error) {
        console.error('Error updating playlist:', error);
      }
    }
  };

  // Handle playlist deletion
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this playlist?");
    if (confirmed) {
      await onDelete(); 
      navigate('/home'); 
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
        <input
          type="text"
          name="tags"
          placeholder="Tags"
          value={tags}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={genre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="playlistArt"
          placeholder="Playlist Art URL"
          value={playlistArt}
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
