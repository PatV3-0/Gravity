import React, { Component } from 'react';
import './Followers.css';

class FollowersFollowing extends Component {
  render() {
    const { followers, following } = this.props;
    return (
      <div className="followers-following-component">
        <h2>Followers</h2>
        <ul>
          {followers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <h2>Following</h2>
        <ul>
          {following.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FollowersFollowing;
