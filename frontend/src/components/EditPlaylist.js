import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditPlaylist = ({ playlist, onSave, onDelete, fetchPlaylistData }) => {
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

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlaylistArt(reader.result); // Update playlistArt with the dropped image
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior to allow drop
  };

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
        <div
          className="playlist-art-dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          <p>Drag and drop an image here for Playlist Art</p>
        </div>
        <input
          type="text"
          name="playlistArt"
          placeholder="Playlist Art URL (optional)"
          value={playlistArt}
          onChange={handleChange}
        />
        <button className="submit" type="submit">Save</button>
      </form>
      <button onClick={handleDelete} className="delete-button">
        Delete Playlist
      </button>
    </div>
  );
};

export default EditPlaylist;
