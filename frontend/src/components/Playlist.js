import React, { Component } from 'react';
import Song from './Song';
import AddSongToPlaylist from './AddSongToPlaylist';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddSongForm: false,
    };
  }

  handleAddSongClick = () => {
    this.setState({ showAddSongForm: true });
  };

  handleCancelAddSong = () => {
    this.setState({ showAddSongForm: false });
  };

  handleAddSongSubmit = (songDetails) => {
    // You can implement adding the song to the playlist here,
    // for now, just close the form after submission
    this.setState({ showAddSongForm: false });
    console.log("New song details:", songDetails);
    // You can pass this up to a parent component to actually add it to the song list
  };

  render() {
    const { playlist, songs, onEdit } = this.props;
    const { showAddSongForm } = this.state;

    return (
      <div className="playlist-component">
        <h2>{playlist.name}</h2>
        <button onClick={onEdit}>Edit Playlist</button>

        <h3>Songs</h3>
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              <Song {...song} /> {/* Ensure you pass the song props */}
            </li>
          ))}
        </ul>

        {/* Add Song Button */}
        <button onClick={this.handleAddSongClick}>Add Song</button>

        {/* Conditionally render the AddSongToPlaylist form */}
        {showAddSongForm && (
          <AddSongToPlaylist
            onCancel={this.handleCancelAddSong}
            onSubmit={this.handleAddSongSubmit} // Handle the form submission
          />
        )}
      </div>
    );
  }
}

export default Playlist;
