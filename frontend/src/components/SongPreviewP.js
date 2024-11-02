import React, { Component } from 'react';

class SongPreviewP extends Component {
  render() {
    const { song } = this.props;
    if (!song) {
      return null;
    }

    return (
      <div className="song-previewp">
        <h4>{song.name}</h4>
        <p>{song.artist}</p>
      </div>
    );
  }
}

export default SongPreviewP;
