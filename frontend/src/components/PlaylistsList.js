import React, { Component } from 'react';
import PlaylistPreview from './PlaylistPreview';

class PlaylistsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/songs');
      if (!response.ok) {
        throw new Error('Failed to fetch songs');
      }
      const songs = await response.json();
      this.setState({ songs, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  render() {
    const { playlists, title } = this.props; // Destructure the title prop
    const { songs, loading, error } = this.state;

    if (loading) {
      return <p>Loading songs...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
      <div className="playlists-list-component">
        <h2>{title}</h2> {/* Use the title prop for the header */}
        <div className="playlist-previews-grid">
          {playlists.map((playlist) => (
            <PlaylistPreview
              key={playlist._id}
              playlist={playlist}
              songs={songs} // Pass the fetched songs to PlaylistPreview
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PlaylistsList;
