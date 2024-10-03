import React, { Component } from 'react';
import Playlist from '../components/Playlist';
import CommentsList from '../components/Comments'; 
import AddComment from '../components/AddComment';

class PlaylistPage extends Component {
  constructor(props) {
    super(props);

    const playlistId = this.getPlaylistIdFromUrl();

    this.state = {
      playlist: { _id: playlistId, comments: [] },
      songs: [],
      refreshCommentsKey: 0, // State to trigger comment refresh
    };
  }

  getPlaylistIdFromUrl() {
    const url = window.location.pathname;
    const segments = url.split('/');
    const playlistId = segments[segments.length - 1];
    return playlistId;
  }

  handleAddComment = async (text) => {
    const { currentUser } = this.props; // Ensure currentUser is passed as a prop

    if (!currentUser || !currentUser._id) {
      console.error("Current user is not defined or does not have an ID.");
      return;
    }
    const newComment = {
      userId: currentUser._id, 
      text,
    };

    try {
      const response = await fetch(`/api/playlists/${this.state.playlist._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      // Trigger re-fetch of comments by updating the refreshCommentsKey
      this.setState((prevState) => ({
        refreshCommentsKey: prevState.refreshCommentsKey + 1
      }));
      
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  render() {
    const { playlist, songs, refreshCommentsKey } = this.state;

    return (
      <div className="playlist-page">
        <Playlist
          playlist={playlist}
          songs={songs}
          onEdit={() => console.log('Edit playlist')}
        />
        {/* Pass the refreshCommentsKey to force a re-render of CommentsList */}
        <CommentsList key={refreshCommentsKey} playlistId={playlist._id} /> 
        <AddComment onAdd={this.handleAddComment} />
      </div>
    );
  }
}

export default PlaylistPage;
