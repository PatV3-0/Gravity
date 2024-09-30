import React, { Component } from 'react';
import './SongPreview.css'; 

class SongPreview extends Component {
  render() {
    const { song } = this.props;
    if (!song) {
      return null;
    }

    return (
      <div className="song-preview">
        <h4>{song.name}</h4>
        <p>{song.artist}</p>
      </div>
    );
  }
}

export default SongPreview;
