import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentsList extends Component {
  state = {
    comments: [],
    loading: true, 
    error: null
  };

  componentDidMount() {
    this.fetchComments(); 
  }

  fetchComments = async () => {
    const { playlistId } = this.props;

    if (!playlistId) {
      this.setState({ error: 'Playlist ID is undefined', loading: false });
      return;
    }

    try {
      const response = await fetch(`/api/playlists/${playlistId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const comments = await response.json();
    
      
      if (JSON.stringify(comments) !== JSON.stringify(this.state.comments)) {
        this.setState({ comments, loading: false });
      } else {
        this.setState({ loading: false }); // Just stop loading
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      this.setState({ error: 'Failed to fetch comments', loading: false });
    }
  };

  render() {
    const { comments, loading, error } = this.state;

    if (loading) {
      return <p>Loading comments...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
      <div className="comments-list">
      <h3>Comments</h3>
      <div className="comments-all">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Comment key={comment._id || index} comment={comment} />
          ))
        ) : (
          <p>No comments available.</p>
        )}
        </div>
      </div>
    );
  }
}

// Prop validation
CommentsList.propTypes = {
  playlistId: PropTypes.string.isRequired,
};

export default CommentsList;
