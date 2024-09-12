import React, { Component } from 'react';
import './Library.css';
import Playlist from '../components/Playlist';

class Library extends Component {
  constructor(props) {
    super(props);
    // Initialize state with dummy data
    this.state = {
      playlists: props.playlists || [],
      dummySongs: props.songs || [],
    };
  }

  handleEdit = (playlistName) => {
    console.log(`Edit playlist ${playlistName}`);
  };

  render() {
    const { playlists, dummySongs } = this.state;

    return (
      <div className="library-page">
        <h1>Your Playlists</h1>
        {playlists.map((playlist) => (
          <Playlist
            key={playlist.id}
            playlist={playlist}
            songs={dummySongs} // Passing dummy songs
            onEdit={() => this.handleEdit(playlist.name)}
          />
        ))}
      </div>
    );
  }
}

export default Library;
