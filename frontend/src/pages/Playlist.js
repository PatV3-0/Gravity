import React, { Component } from 'react';
import Playlist from '../components/Playlist';
import EditPlaylist from '../components/EditPlaylist';
import CommentList from '../components/Comments';
import AddComment from '../components/AddComment';

class PlaylistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: props.playlist,
      songs: props.songs,
      comments: [{ id: 1, user: 'Jenifer', text: 'I thought this was about cheese?' }, { id: 1, user: 'Gary', text: 'I was expecting cheese but got great rock!' }],
    };
  }

  handleSavePlaylist = (updatedPlaylist) => {
    this.setState({ playlist: updatedPlaylist });
  };

  handleAddComment = (text) => {
    this.setState((prevState) => ({
      comments: [
        ...prevState.comments,
        { id: prevState.comments.length + 1, user: 'User 2', text },
      ],
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
        <EditPlaylist playlist={playlist} onSave={this.handleSavePlaylist} />
        <CommentList comments={comments} />
        <AddComment onAdd={this.handleAddComment} />
      </div>
    );
  }
}

export default PlaylistPage;
