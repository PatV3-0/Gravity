import React, { Component } from 'react';

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="comment-component">
        <p><strong>{comment.user}</strong>: {comment.text}</p>
      </div>
    );
  }
}

export default Comment;
