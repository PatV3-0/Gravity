import React, { Component } from 'react';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
    };
  }

  handleChange = (e) => {
    this.setState({ commentText: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.commentText);
    this.setState({ commentText: '' });
  };

  render() {
    return (
      <div className="add-comment-component">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add a comment"
            value={this.state.commentText}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    );
  }
}

export default AddComment;
