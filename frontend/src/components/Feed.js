import React, { Component } from 'react';
import SearchInput from '../components/SearchInput';
import PlaylistPreview from './PlaylistPreview';
import SongPreview from './SongPreview';
import UserPreview from './UserPreview';
import './Feed.css';

class Feed extends Component {
  static defaultProps = {
    playlists: [],
    songs: [],
    users: []
  };

  state = {
    playlists: [],
    songs: [],
    users: [],
    searchQuery: '',
    filteredPlaylists: [],
    filteredSongs: [],
    filteredUsers: [],
    currentPlaylistIndex: 0,
    currentUserIndex: 0,
  };

  async componentDidMount() {
    try {
      const playlistResponse = await fetch('/api/playlists');
      const playlists = await playlistResponse.json();
      this.setState({ playlists });

      const songResponse = await fetch('/api/songs');
      const songs = await songResponse.json();
      this.setState({ songs, filteredSongs: songs });

      const userResponse = await fetch('/api/users');
      const users = await userResponse.json();
      this.setState({ users, filteredUsers: users });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleSearch = (query) => {
    const filteredPlaylists = this.state.playlists.filter(playlist =>
      playlist.name && playlist.name.toLowerCase().includes(query.toLowerCase())
    );

    const filteredSongs = this.state.songs.filter(song => {
      const titleMatch = song.title && song.title.toLowerCase().includes(query.toLowerCase());
      const artistMatch = song.artist && song.artist.toLowerCase().includes(query.toLowerCase());
      const albumMatch = song.album && song.album.toLowerCase().includes(query.toLowerCase());
      const genreMatch = song.genre && song.genre.toLowerCase().includes(query.toLowerCase());

      return titleMatch || artistMatch || albumMatch || genreMatch;
    });

    const filteredUsers = this.state.users.filter(user => {
      const usernameMatch = user.username && user.username.toLowerCase().includes(query.toLowerCase());
      const nameMatch = user.name && user.name.toLowerCase().includes(query.toLowerCase());
      const lastNameMatch = user.surname && user.surname.toLowerCase().includes(query.toLowerCase()); 
      
      return usernameMatch || nameMatch || lastNameMatch;
    });

    this.setState({
      searchQuery: query,
      filteredPlaylists,
      filteredSongs,
      filteredUsers
    });
  };

  handleCarousel = (type, direction) => {
    this.setState((prevState) => {
      const key = `current${type}Index`;
      const totalItems = this.state[type.toLowerCase() + 's'].length;
      const itemsToShow = type === 'Playlist' ? 3 : type === 'User' ? 4 : 8; 
      let newIndex = prevState[key] + direction;

      // Adjusting bounds to prevent overflow
      if (newIndex < 0) newIndex = 0; // Don't go below 0
      if (newIndex >= totalItems - itemsToShow) newIndex = totalItems - itemsToShow; 

      return { [key]: newIndex };
    });
  };

  renderPlaylists() {
    const playlistsToRender = this.state.searchQuery ? this.state.filteredPlaylists : this.state.playlists;
    const { currentPlaylistIndex } = this.state;

    return (
      <div className="carousel playlist-carousel" style={{ transform: `translateX(-${currentPlaylistIndex * (377 + 10)}px)` }}>
        {playlistsToRender.map((playlist, index) => (
          <div className="carousel-item" key={`${playlist._id}-${index}`}>
            <PlaylistPreview key={playlist._id} playlist={playlist} songs={this.state.songs} />
          </div>
        ))}
      </div>
    );
  }

  renderUsers() {
    const usersToRender = this.state.filteredUsers;
    const currentIndex = this.state.currentUserIndex;

    return (
      <div className="carousel user-carousel" style={{ transform: `translateX(-${(currentIndex * 25)}%)` }}>
        {usersToRender.map((user, index) => (
          <div className="carousel-item" key={`${user._id}-${index}`}>
            <UserPreview user={user} />
          </div>
        ))}
      </div>
    );
  }

  renderSongs() {
    const songsToRender = this.state.searchQuery ? this.state.filteredSongs : this.state.songs;

    return (
      <div className="song-carousel-container">
        <div className="song-carousel">
          {songsToRender.slice(0, 8).map((song, index) => (
            <div className="song-row" key={`${song._id}-${index}`}>
              <SongPreview song={song} className="song"/>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="feed">
        <h2>Feed</h2>
        <SearchInput onSearch={this.handleSearch} />
        <div className="feed-section">
          <h3>Playlists</h3>
          <button onClick={() => this.handleCarousel('Playlist', -1)}>Previous</button>
          <button onClick={() => this.handleCarousel('Playlist', 1)}>Next</button>
          {this.renderPlaylists()}
        </div>
        <div className="feed-section">
          <h3>Users</h3>
          <button onClick={() => this.handleCarousel('User', -1)}>Previous</button>
          <button onClick={() => this.handleCarousel('User', 1)}>Next</button>
          {this.renderUsers()}
        </div>
        <div className="feed-section">
          <h3>Songs</h3>
          {this.renderSongs()}
        </div>
      </div>
    );
  }
}

export default Feed;
