import React from 'react';
import { useUser } from '../userContext';
import './Song.css';

function Song(props) {
  const { name, artist, album, genre, releaseYear, duration, id, fetchPlaylistData, onDelete } = props; // Accept fetchPlaylistData prop
  const { currentUser } = useUser(); 

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        fetchPlaylistData(); 
      } else {
        console.error("Failed to delete the song");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="song">
      <h2 className="song-title">{name}</h2>
      <p className="song-artist">Artist: {artist}</p>
      {album && <p className="song-album">Album: {album}</p>}
      {genre && <p className="song-genre">Genre: {genre}</p>}
      {releaseYear && <p className="song-release-year">Release Year: {releaseYear}</p>}
      <p className="song-duration">Duration: {duration}</p>

      {currentUser?.admin && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
}

export default Song;