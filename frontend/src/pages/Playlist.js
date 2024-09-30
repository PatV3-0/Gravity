import React, { Component } from 'react';
import Playlist from '../components/Playlist';
import CommentList from '../components/Comments';
import AddComment from '../components/AddComment';

class PlaylistPage extends Component {
  constructor(props) {
    super(props);
    const { playlist = { comments: [] }, songs } = props;
    this.state = {
      playlist: playlist,
      songs: songs,
      comments: playlist.comments || [],
    };
  }

  handleSavePlaylist = (updatedPlaylist) => {
    this.setState({ playlist: updatedPlaylist });
  };

  handleAddComment = (text) => {
    const { currentUser } = this.props;
    const newComment = {
      id: this.state.comments.length + 1,
      user: currentUser.name || 'User',
      text,
    }; // Use current user name
    this.setState((prevState) => ({
      comments: [...prevState.comments, newComment],
    }));
  };

  render() {
    const { playlist, songs, comments } = this.state;

    return (
      <div className="playlist-page">
        <Playlist
          playlist={playlist}
          songs={songs}
          onEdit={() => console.log('Edit playlist')}
        />
        <CommentList comments={comments} />
        <AddComment onAdd={this.handleAddComment} />
      </div>
    );
  }
}

export default PlaylistPage;
