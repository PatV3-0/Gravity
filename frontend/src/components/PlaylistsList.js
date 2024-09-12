import React, { Component } from 'react';
import './Playlists.css';

class PlaylistsList extends Component {
  render() {
    const { playlists, songs } = this.props;
    return (
      <div className="playlists-songs-component">
        <h2>Playlists</h2>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
        </ul>
        <h2>Songs</h2>
        <ul>
          {songs.map((song) => (
            <li key={song.id}>{song.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PlaylistsList;
