import React, { Component } from 'react';

class Comment extends Component {
  state = {
    commentDetails: null,
    userDetails: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchCommentDetails();
  }

  fetchCommentDetails = async () => {
    const { comment } = this.props;
    const commentId = comment._id || comment.id;

    try {
      const response = await fetch(`/api/comments/${commentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comment details');
      }
      const commentDetails = await response.json();
      this.setState({ commentDetails, loading: false });

      // Fetch user details if a user is present
      if (commentDetails.user) {
        this.fetchUserDetails(commentDetails.user);
      }
    } catch (error) {
      console.error("Error fetching comment details:", error);
      this.setState({ error: 'Failed to fetch comment details', loading: false });
    }
  };

  fetchUserDetails = async (userId) => {
    const url = `/api/users/${userId}`;

    try {
      const response = await fetch(url);

      // Check if response is OK
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userDetails = await response.json();

      if (!userDetails) {
        // User does not exist, delete the comment
        await this.deleteComment();
      } else {
        this.setState({ userDetails });
      }
    } catch (error) {
      await this.deleteComment();
    }
  };

  deleteComment = async () => {
    const { comment } = this.props;
    const commentId = comment._id || comment.id;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      this.setState({ commentDetails: null }); // Clear comment details
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      this.setState({ error: 'Failed to delete comment' });
    }
  };

  render() {
    const { comment } = this.props;
    const { commentDetails, userDetails, loading, error } = this.state;

    const userDisplay = userDetails ? userDetails.username || 'Unknown User' : 'Loading user...';

    if (loading) {
      return <p aria-live="polite">Loading comment details...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (!commentDetails) {
      return null;
    }

    return (
      <div className="comment-component">
        <p><strong>{userDisplay}</strong>: {commentDetails.text || 'No comment text available.'}</p>
      </div>
    );
  }
}

export default Comment;
