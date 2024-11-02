import React, { Component } from 'react';
import Playlist from '../components/Playlist';
import CommentsList from '../components/Comments'; 
import AddComment from '../components/AddComment';
import backsplash from '../../public/assets/images/backing.png';

class PlaylistPage extends Component {
  constructor(props) {
    super(props);

    const playlistId = this.getPlaylistIdFromUrl();

    this.state = {
      playlist: { _id: playlistId, comments: [] },
      songs: [],
      refreshCommentsKey: 0, 
      saved: false,
    };
  }

  getPlaylistIdFromUrl() {
    const url = window.location.pathname;
    const segments = url.split('/');
    const playlistId = segments[segments.length - 1];
    return playlistId;
  }

  handleAddComment = async (text) => {
    const { currentUser } = this.props; 
    console.log(currentUser.admin);
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

      this.setState((prevState) => ({
        refreshCommentsKey: prevState.refreshCommentsKey + 1
      }));
      
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  handleEditPlaylist = async (updatedData) => {
    const { currentUser } = this.props;

    if (!currentUser || !currentUser._id) {
      console.error("Current user is not defined or does not have an ID.");
      return;
    }

    try {
      const response = await fetch(`/api/playlists/${this.state.playlist._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedData,
          updatedBy: currentUser._id
        }),
      });

      if (response.ok) {
        const updatedPlaylist = await response.json();
        this.setState({ playlist: updatedPlaylist });
      } else {
        console.error('Failed to update playlist:', response.statusText);
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  handleSavePlaylist = async () => {
  const { currentUser } = this.props;
  const { playlist } = this.state;

  if (!currentUser || !currentUser._id) {
    console.error("Current user is not defined or does not have an ID.");
    return;
  }

  if (currentUser._id === playlist.createdBy) {
    console.warn("You cannot save your own playlist.");
    return;
  }

  try {
    const response = await fetch(`/api/playlists/${playlist._id}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: currentUser._id }),
    });

    if (response.ok) {
      const savedPlaylist = await response.json();
      this.setState({ saved: true });
      console.log("Playlist saved successfully:", savedPlaylist);
    } else {
      const errorData = await response.json();
      console.error('Failed to save playlist:', errorData.message);
    }
  } catch (error) {
    console.error("Error saving playlist:", error);
  }
};


  render() {
    const { playlist, songs, refreshCommentsKey, saved } = this.state;
    const { currentUser } = this.props;

    const isOwner = currentUser && currentUser._id === playlist.createdBy;
    const isAdmin = currentUser && currentUser.admin === 'true'; 

    return (
      <div className="playlist-page" style={{ backgroundImage: `url(${backsplash})` }}>
        <Playlist
          playlist={playlist}
          songs={songs}
          onEdit={() => this.handleEditPlaylist()}
          onDelete={this.handleDeletePlaylist}
          canEdit={isOwner || isAdmin}
          canDelete={isOwner || isAdmin}
          onSave={this.handleSavePlaylist}
          saved={saved}
          currentUser={currentUser}
        />
        <div className="commentsGroup">
        <CommentsList key={refreshCommentsKey} playlistId={playlist._id} /> 
        <AddComment onAdd={this.handleAddComment} />
        </div>
      </div>
    );
  }
}

export default PlaylistPage;