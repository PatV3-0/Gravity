import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="comment-list-component">
        <h3>Comments</h3>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    );
  }
}

export default CommentList;
