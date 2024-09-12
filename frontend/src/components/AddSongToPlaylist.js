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
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      songDetails: {
        ...prevState.songDetails,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Log the song details, you can replace this with any further action
    console.log("Song details:", this.state.songDetails);
  };

  render() {
    const { title, artist, album, genre, releaseYear, duration } = this.state.songDetails;
    const { onCancel } = this.props;

    return (
      <div className="add-song-container">
        <h3>Add Song to Playlist</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={this.handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={artist}
              onChange={this.handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="album">Album:</label>
            <input
              type="text"
              id="album"
              name="album"
              value={album}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={genre}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="releaseYear">Release Year:</label>
            <input
              type="number"
              id="releaseYear"
              name="releaseYear"
              value={releaseYear}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={duration}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit">Add Song</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default AddSongToPlaylist;
