import React, { Component } from 'react';
import UserPreview from './UserPreview'; 
import './Followers.css';

class FollowersFollowing extends Component {
  render() {
    const { friends } = this.props;

    if (!friends || friends.length === 0) {
      return <div>No friends to display</div>;
    }

    // Filter out friends that have errors
    const validFriends = friends.filter(friend => !friend.message);

    if (validFriends.length === 0) {
      return <div>No valid friends to display due to server errors</div>;
    }

    return (
      <div className="followers-following-component">
        <h2>Friends</h2>
        <div className="friends-list">
          {validFriends.map((user) => (
            <UserPreview key={user._id} user={user} />
          ))}
        </div>
      </div>
    );
  }
}

export default FollowersFollowing;
