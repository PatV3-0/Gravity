import React, { Component } from 'react';
import './Library.css';
import Playlist from '../components/Playlist';
import { useUser } from '../UserContext'; // Import useUser to access currentUser

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      // Fetch playlists for the current user
      const response = await fetch(`/api/playlists/user/${this.props.currentUser._id}`);
      const playlists = await response.json();
      this.setState({ playlists, isLoading: false });
    } catch (error) {
      console.error("Error fetching playlists:", error);
      this.setState({ error: "Failed to load playlists", isLoading: false });
    }
  }

  render() {
    const { playlists, isLoading, error } = this.state;
    console.log(playlists);
    if (isLoading) {
      return <p>Loading playlists...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    return (
      <div className="library-page max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Playlists</h1>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <Playlist
              key={playlist._id}
              playlist={playlist}
              songs={playlist.songs}
            />
          ))
        ) : (
          <p>No playlists found.</p>
        )}
      </div>
    );
  }
}

// Export with `useUser` to access `currentUser`
export default function LibraryWithUser() {
  const { currentUser } = useUser();
  return <Library currentUser={currentUser} />;
}
