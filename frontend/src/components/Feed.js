import React, { Component } from 'react';
import SearchInput from '../components/SearchInput';
import PlaylistPreview from './PlaylistPreview';
import SongPreview from './SongPreview';
import UserPreviewP from './UserPreviewP';

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
    currentSection: 'songs', 
  };

  async componentDidMount() {
    try {
      const playlistResponse = await fetch('/api/playlists');
      const playlists = await playlistResponse.json();
      playlists.sort((a, b) => b._id.localeCompare(a._id));

      const songResponse = await fetch('/api/songs');
      const songs = await songResponse.json();
      songs.sort((a, b) => b._id.localeCompare(a._id)); 

      const userResponse = await fetch('/api/users');
      const users = await userResponse.json();
      users.sort((a, b) => b._id.localeCompare(a._id)); 

      this.setState({ playlists, songs, filteredSongs: songs, users, filteredUsers: users });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleSearch = (query) => {
  const isTagSearch = query.startsWith('#');
  const lowerCaseQuery = query.toLowerCase();
  const tagQuery = isTagSearch ? lowerCaseQuery.slice(1) : lowerCaseQuery; // Remove `#` only if it's a tag search

  const filteredPlaylists = this.state.playlists.filter(playlist => {
    const nameMatch = playlist.name && playlist.name.toLowerCase().includes(lowerCaseQuery);
    const tagMatch = isTagSearch && playlist.tags && playlist.tags.some(tag => tag.toLowerCase() === tagQuery);
    const genreMatch = !isTagSearch && playlist.genre && playlist.genre.some(genre => genre.toLowerCase().includes(lowerCaseQuery));

    return nameMatch || tagMatch || genreMatch;
  });

  const filteredSongs = this.state.songs.filter(song => {
    const titleMatch = song.name && song.name.toLowerCase().includes(lowerCaseQuery);
    const artistMatch = song.artist && song.artist.toLowerCase().includes(lowerCaseQuery);
    const albumMatch = song.album && song.album.toLowerCase().includes(lowerCaseQuery);
    const genreMatch = !isTagSearch && song.genre && song.genre.toLowerCase().includes(lowerCaseQuery);
    const tagMatch = isTagSearch && song.tags && song.tags.some(tag => tag.toLowerCase() === tagQuery);

    return titleMatch || artistMatch || albumMatch || genreMatch || tagMatch;
  });

  const filteredUsers = this.state.users.filter(user => {
    const usernameMatch = user.username && user.username.toLowerCase().includes(lowerCaseQuery);
    const nameMatch = user.name && user.name.toLowerCase().includes(lowerCaseQuery);
    const lastNameMatch = user.surname && user.surname.toLowerCase().includes(lowerCaseQuery);

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

      if (newIndex < 0) newIndex = 0;
      if (newIndex >= totalItems - itemsToShow) newIndex = totalItems - itemsToShow; 

      return { [key]: newIndex };
    });
  };

  toggleSection = (section) => {
    this.setState({ currentSection: section });
  };

  renderPlaylists() {
    const playlistsToRender = this.state.searchQuery ? this.state.filteredPlaylists : this.state.playlists;
    const { currentPlaylistIndex } = this.state;

    return (
      <div className="carousel playlist-carousel" style={{ transform: `translateX(-${currentPlaylistIndex * (377 + 10)}px)` }}>
        {playlistsToRender.map((playlist, index) => (
          <div className="carousel-item-Playlist" key={`${playlist._id}-${index}`}>
            <PlaylistPreview key={playlist._id} playlist={playlist} songs={this.state.songs} />
          </div>
        ))}
      </div>
    );
  }

  renderUsers() {
  const usersToRender = this.state.filteredUsers;
  const currentIndex = this.state.currentUserIndex;
  
  const itemsToShow = 4; 
  const totalItems = usersToRender.length;

  return (
    <div className="carousel user-carousel" style={{ transform: `translateX(-${(currentIndex * (377 + 10))}px)` }}>
      {usersToRender.map((user, index) => (
        <div className="carousel-item" key={`${user._id}-${index}`}>
          <UserPreviewP user={user} />
        </div>
      ))}
    </div>
  );
}

  renderSongs() {
    const songsToRender = this.state.searchQuery ? this.state.filteredSongs : this.state.songs;

    return (
      <div className="song-carousel">
        <div className="song-carousel-inside">
          {songsToRender.slice(0, 8).map((song, index) => (
            <div className="song-row" key={`${song._id}-${index}`}>
              <SongPreview song={song} className="song"/>
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderCurrentSection() {
    switch (this.state.currentSection) {
      case 'playlists':
        return (
          <div className="feed-section">
            <SearchInput onSearch={this.handleSearch} />
            <div className="carousel-container">
              <button className="carousel-button previous" onClick={() => this.handleCarousel('Playlist', -1)}>Previous</button>
              {this.renderPlaylists()}
              <button className="carousel-button next" onClick={() => this.handleCarousel('Playlist', 1)}>Next</button>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="feed-section">
            <SearchInput onSearch={this.handleSearch} />
            <div className="carousel-container">
              <button className="carousel-button previous" onClick={() => this.handleCarousel('User', -1)}>Previous</button>
              {this.renderUsers()}
              <button className="carousel-button next" onClick={() => this.handleCarousel('User', 1)}>Next</button>
            </div>
          </div>
        );
      case 'songs':
        return (
          <div className="feed-section">
            <SearchInput onSearch={this.handleSearch} />
            {this.renderSongs()}
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    const { currentSection } = this.state;

  return (
    <div className="feed">
      <div className="toggle-buttons">
        <button 
          onClick={() => this.toggleSection('songs')}
          className={currentSection === 'songs' ? 'active-button' : ''}
        >
          Songs
        </button>
        <button 
          onClick={() => this.toggleSection('playlists')}
          className={currentSection === 'playlists' ? 'active-button' : ''}
        >
          Playlists
        </button>
        <button 
          onClick={() => this.toggleSection('users')}
          className={currentSection === 'users' ? 'active-button' : ''}
        >
          Users
        </button>
      </div>
      {this.renderCurrentSection()}
    </div>
  );
  }
}

export default Feed;
