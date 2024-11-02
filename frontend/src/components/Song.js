import React from 'react';
import { useUser } from '../userContext';

function Song(props) {
  const {
    name,
    artist,
    album,
    genre,
    releaseYear,
    duration,
    id,
    spotifyUrl,
    fetchPlaylistData,
    onDelete
  } = props; 
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
      {spotifyUrl ? (
        <iframe
          style={{ borderRadius: '12px' }} 
          src={spotifyUrl}
          frameBorder="0"
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={name} 
        ></iframe>
      ) : (
        <>
          <h2 className="song-title">{name}</h2>
          <p className="song-artist">Artist: {artist}</p>
          {album && <p className="song-album">Album: {album}</p>}
          {genre && <p className="song-genre">Genre: {genre}</p>}
          {releaseYear && <p className="song-release-year">Release Year: {releaseYear}</p>}
          <p className="song-duration">Duration: {duration}</p>
        </>
      )}

      {currentUser?.admin === "true" && (
        <button className="delete-button" onClick={handleDelete}>
          x
        </button>
      )}
    </div>
  );
}

export default Song;
