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
  
  try {
    const response = await fetch(`/comments/${comment}`);
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
  const url = `../api/users/${userId}`;

  try {
    const response = await fetch(url);
    
    // Check if response is OK
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    // Check the Content-Type header
    const contentType = response.headers.get("content-type");
    // Attempt to parse the JSON
    const userDetails = await response.json();
    this.setState({ userDetails });
  } catch (error) {
    console.error("Error fetching user details:", error);
    this.setState({ error: 'Failed to fetch user details' });
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

    return (
      <div className="comment-component">
        <p><strong>{userDisplay}</strong>: {commentDetails?.text || 'No comment text available.'}</p>
      </div>
    );
  }
}

export default Comment;
