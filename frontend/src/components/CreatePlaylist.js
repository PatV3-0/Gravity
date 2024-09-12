import React, { Component } from 'react';
import './CreatePlaylist.css';

class CreatePlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
    };
  }

  handleChange = (e) => {
    this.setState({ playlistName: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state.playlistName);
    this.setState({ playlistName: '' });
  };

  render() {
    const { playlistName } = this.state;
    return (
      <div className="create-playlist-component">
        <h2>Create Playlist</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Playlist Name"
            value={playlistName}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default CreatePlaylist;
