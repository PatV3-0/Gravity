import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import SongPreviewP from './SongPreviewP';

class PlaylistPreview extends Component {
  render() {
    const { playlist, songs } = this.props;

    return (
      <div className="playlist-preview">
        <Link to={`/playlists/${playlist._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>{playlist.name}</h3>
          <p>{playlist.description}</p>
        
        <div className="songs-list">
          {Array.isArray(playlist.songs) && playlist.songs.length > 0 ? (
            playlist.songs.slice(0, 3).map(songId => {
              const song = songs.find(song => song._id === songId);
              // Log the song for debugging
              // console.log("Found song:", song);
              return song ? <SongPreviewP key={songId} song={song} /> : null;
            })
          ) : (
            <p>No songs available</p>
          )}
        </div>
        </Link>
      </div>
    );
  }
}

export default PlaylistPreview;
