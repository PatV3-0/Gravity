import React, { Component } from 'react';
import './PlaylistPreview.css'; // Optional: for styling

class PlaylistPreview extends Component {
  render() {
    const { playlist } = this.props;

    return (
      <div className="playlist-preview">
        <h3>{playlist.name}</h3>
        <p>{playlist.description}</p>
      </div>
    );
  }
}

export default PlaylistPreview;
