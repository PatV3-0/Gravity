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
      },
      searchQuery: '',
      filteredSongs: [],
      allSongs: [],
    };
  }

  componentDidMount() {
    this.fetchSongs();
  }

  // Fetch songs from the API
  fetchSongs = async () => {
    try {
      const response = await fetch('/api/songs'); // API call to fetch songs
      const data = await response.json();
      this.setState({ allSongs: data, filteredSongs: [] });
    } catch (error) {
      console.error('Error fetching songs:', error);
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
    this.setState({ filteredSongs });
  };

  handleSelectSong = async (song) => {
    try {
      await fetch(`/api/playlists/${this.props.playlistId}/add-song`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId: song._id }),
      });
      this.props.onSongAdded(song); // Notify parent to update the playlist
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  render() {
    const { onCancel } = this.props;

    return (
      <div className="add-song-container">
        <h3>Add Song to Playlist</h3>
        <input
          type="text"
          placeholder="Search for songs"
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSearch}>Search</button>

        <ul>
          {this.state.filteredSongs.map(song => (
            <li key={song._id} onClick={() => this.handleSelectSong(song)}>
              {song.name} - {song.artist}
            </li>
          ))}
        </ul>

        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    );
  }
}

export default AddSongToPlaylist;
