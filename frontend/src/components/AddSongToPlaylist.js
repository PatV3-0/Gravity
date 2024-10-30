import React, { Component } from 'react';
import './AddSongToPlaylist.css';

class AddSongToPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songDetails: {
        title: '',
        artist: '',
        album: '',
        genre: '',
        releaseYear: '',
        duration: '',
        spotifyUrl: '',
      },
      searchQuery: '',
      filteredSongs: [],
      allSongs: [],
      isAddingNewSong: false,
      error: null, // New state for error handling
    };
  }

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs = async () => {
    try {
      const response = await fetch('/api/songs');
      const data = await response.json();
      this.setState({ allSongs: data, filteredSongs: [] });
    } catch (error) {
      console.error('Error fetching songs:', error);
      this.setState({ error: 'Failed to fetch songs' }); // Set error state
    }
  };

  handleInputChange = (e) => {
    const query = e.target.value;
    this.setState({ searchQuery: query });
  };

  handleSearch = () => {
    const query = this.state.searchQuery.toLowerCase();
    const filteredSongs = this.state.allSongs.filter(song => {
      const titleMatch = song.name && song.name.toLowerCase().includes(query);
      const artistMatch = song.artist && song.artist.toLowerCase().includes(query);
      const albumMatch = song.album && song.album.toLowerCase().includes(query);
      const genreMatch = song.genre && song.genre.toLowerCase().includes(query);

      return titleMatch || artistMatch || albumMatch || genreMatch;
    });

    this.setState({ filteredSongs, isAddingNewSong: filteredSongs.length === 0 });
  };

  handleSelectSong = async (song) => {
  const { allSongs } = this.state;
  const isDuplicate = allSongs.some(existingSong => existingSong._id === song._id);

  if (isDuplicate) {
    alert('This song is already in the playlist.');
    return;
  }

  try {
    await fetch(`/api/playlists/${this.props.playlistId}/add-song`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ songId: song._id }), 
    });
    this.props.onSongAdded(song);
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    this.setState({ error: 'Failed to add song to playlist' }); 
  }
};

  handleAddSong = async () => {
    const { songDetails, allSongs } = this.state;
    const isDuplicate = allSongs.some(song =>
      song.title === songDetails.title && 
      song.artist === songDetails.artist && 
      song.album === songDetails.album
    );

    if (isDuplicate) {
      this.setState({ error: 'Duplicate song cannot be added to the database.' });
      return;
    }

    try {
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(songDetails),
      });

      if (response.ok) {
        const newSong = await response.json();
        this.props.onSongAdded(newSong);
        this.setState({ 
          isAddingNewSong: false, 
          songDetails: { title: '', artist: '', album: '', genre: '', releaseYear: '', duration: '', spotifyUrl: '' }, 
          error: null // Clear error
        });
        this.handleSelectSong(newSong);
      } else {
        this.setState({ error: 'Failed to add new song' }); 
      }
    } catch (error) {
      console.error('Error adding new song:', error);
      this.setState({ error: 'Error adding new song' });
    }
  };

  handleSongDetailsChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      songDetails: {
        ...prevState.songDetails,
        [name]: value,
      },
    }));
  };

  render() {
    const { onCancel } = this.props;
    const { filteredSongs, isAddingNewSong, songDetails, error } = this.state;

    return (
      <div className="add-song-container">
        <h3>Add Song to Playlist</h3>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <input
          type="text"
          placeholder="Search for songs"
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSearch}>Search</button>

        <ul>
          {filteredSongs.map(song => (
            <li key={song._id} onClick={() => this.handleSelectSong(song)}>
              {song.name} - {song.artist}
            </li>
          ))}
        </ul>

        {isAddingNewSong && (
          <div>
            <h4>Add New Song</h4>
            <input name="title" placeholder="Title" value={songDetails.title} onChange={this.handleSongDetailsChange} />
            <input name="artist" placeholder="Artist" value={songDetails.artist} onChange={this.handleSongDetailsChange} />
            <input name="album" placeholder="Album" value={songDetails.album} onChange={this.handleSongDetailsChange} />
            <input name="genre" placeholder="Genre" value={songDetails.genre} onChange={this.handleSongDetailsChange} />
            <input name="releaseYear" placeholder="Release Year" value={songDetails.releaseYear} onChange={this.handleSongDetailsChange} />
            <input name="duration" placeholder="Duration" value={songDetails.duration} onChange={this.handleSongDetailsChange} />
            <input name="spotifyUrl" placeholder="Spotify url" value={songDetails.spotifyUrl} onChange={this.handleSongDetailsChange} />
            <button type="button" onClick={this.handleAddSong}>Add Song</button>
          </div>
        )}

        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    );
  }
}

export default AddSongToPlaylist;
