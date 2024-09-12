import React, { Component } from 'react';
import PlaylistPreview from './PlaylistPreview';
import SongPreview from './SongPreview';
import './Feed.css'; // Optional: for styling

class Feed extends Component {
  // Default props to ensure playlists and songs are always arrays
  static defaultProps = {
    playlists: [],
    songs: []
  };

  renderPlaylists() {
    const { playlists } = this.props;
    return playlists.map((playlist) => (
      <PlaylistPreview key={playlist.id} playlist={playlist} />
    ));
  }

  renderSongs() {
    const { songs } = this.props;
    return songs.map((song) => (
      <SongPreview key={song.id} song={song} />
    ));
  }

  render() {
    return (
      <div className="feed">
        <h2>Feed</h2>
        <div className="feed-section">
          <h3>Playlists</h3>
          <div className="playlist-previews">
            {this.renderPlaylists()}
          </div>
        </div>
        <div className="feed-section">
          <h3>Songs</h3>
          <div className="song-previews">
            {this.renderSongs()}
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
