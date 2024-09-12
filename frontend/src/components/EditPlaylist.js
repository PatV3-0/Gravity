import React, { Component } from 'react';

class EditPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: props.playlist.name,
    };

    // Bind class methods to 'this'
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ playlistName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { playlist, onSave } = this.props;
    onSave({ ...playlist, name: this.state.playlistName });
  }

  render() {
    return (
      <div className="edit-playlist-component">
        <h2>Edit Playlist</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Playlist Name"
            value={this.state.playlistName}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default EditPlaylist;
