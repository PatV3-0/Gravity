import React from 'react';
import { useUser } from '../userContext';
import './CreatePlaylist.css';

const CreatePlaylist = ({ onCreate }) => {
  const { currentUser } = useUser();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [playlistName, setPlaylistName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [playlistArt, setPlaylistArt] = React.useState('https://e1.pngegg.com/pngimages/185/163/png-clipart-gravity-falls-s-21-icon.png'); // Default playlist art
  const [tags, setTags] = React.useState('');
  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [isGenresExpanded, setIsGenresExpanded] = React.useState(false); // New state for genre visibility

  const genres = ['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'R&B', 'Country', 'Electronic', 'Reggae', 'Latin', 'Blues', 'Folk', 'Metal', 'Punk', 'Gospel', 'Soul', 'Disco', 'New Wave', 'Alternative', 'Indie', 'Ska', 'Soundtrack', 'World Music', 'Ambient', 'Lo-Fi', 'Funk', 'Grunge'];

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) => 
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("User must be logged in to create a playlist");
      return;
    }

    // Set default playlist name if none is provided
    const finalPlaylistName = playlistName.trim() === '' ? `${currentUser.username}'s playlist` : playlistName;

    // Check if tags are empty and set to an empty array if true
    const finalTags = tags.trim() === '' ? [] : tags.split(',').map(tag => tag.trim());

    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser._id,
          playlistName: finalPlaylistName,
          description,
          playlistArt,
          tags: finalTags, // Use finalTags here
          genre: selectedGenres,
          dateCreated: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const newPlaylist = await response.json();
        onCreate(newPlaylist);
        // Reset the form fields
        setPlaylistName('');
        setDescription('');
        setPlaylistArt('https://e1.pngegg.com/pngimages/185/163/png-clipart-gravity-falls-s-21-icon.png'); 
        setTags('');
        setSelectedGenres([]);
        setIsExpanded(false); // Collapse the component after creation
      } else {
        console.error('Failed to create playlist:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };


  return (
    <div className="create-playlist-component">
      <h2 onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer' }}>
        Create Playlist
      </h2>
      {isExpanded && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <button type="button" onClick={() => setIsGenresExpanded(!isGenresExpanded)}>
              {isGenresExpanded ? 'Hide Genres' : 'Select Genres'}
            </button>
            {isGenresExpanded && (
              <div className="genre-selection">
                {genres.map((genre, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="checkbox"
                        value={genre}
                        checked={selectedGenres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                      />
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Tags (optional, comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      )}
    </div>
  );
};

export default CreatePlaylist;
