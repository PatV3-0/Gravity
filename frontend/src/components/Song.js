import React, { Component } from 'react';
import './Song.css';

class Song extends Component {
  render() {
    const { title, artist, album, genre, releaseYear, duration } = this.props;

    return(
      <div className ="song">
        <h2 className="song-title">{title}</h2>
        <p className="song-artist">Artist: {artist}</p>
        {album && <p className="song-album">Album: {album}</p>}
        {genre && <p className="song-genre">Genre: {genre}</p>}
        {releaseYear && <p className="song-release-year">Release Year: {releaseYear}</p>}
        <p className="song-duration">Duration: {duration}</p>
      </div>
    )
  }
}

export default Song;