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
        <div className="community">
          <p>When making comments on social media, aim to be respectful, constructive, and considerate. Share opinions and feedback in a way that adds value to the conversation and keeps the tone positive. Avoid personal attacks, offensive language, and overly critical or inflammatory remarks. Instead, focus on thoughtful responses that contribute meaningfully, showing empathy and understanding for other perspectives. Remember, every comment can impact others, so aim to foster a safe, welcoming environment for all by communicating with kindness and respect.</p>
          <p>If your comments violate these guidelines, our admins may take actions to maintain a positive environment for all users. Depending on the severity and frequency of the violations, these actions can include warnings, temporary suspension of commenting privileges, or, in severe cases, a permanent ban from the platform. Our goal is to ensure that everyone feels safe and respected, so we encourage all users to engage thoughtfully and responsibly. Repeated or serious violations will be handled in line with our community standards to preserve the quality and safety of our online community.</p>
        </div>
      </div>
    );
  }
}

export default AddComment;
