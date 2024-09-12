import React, { Component } from 'react';
import './SongPreview.css'; // Optional: for styling

class SongPreview extends Component {
  render() {
    const { song } = this.props;

    return (
      <div className="song-preview">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
    );
  }
}

export default SongPreview;
