import React, { Component } from 'react';
import UserPreview from './UserPreview'; 
import './Followers.css';

class FollowersFollowing extends Component {
  render() {
    const { followers, following } = this.props;

    // Check if there are followers or following
    if ((!followers || followers.length === 0) && (!following || following.length === 0)) {
      return <div>No followers or following to display</div>;
    }

    return (
      <div className="followers-following-component">
        {followers && followers.length > 0 && (
          <>
            <h2>Followers</h2>
            <div className="friends-list">
              {followers.map(user => (
                <UserPreview key={user._id} user={user} />
              ))}
            </div>
          </>
        )}

        {following && following.length > 0 && (
          <>
            <h2>Following</h2>
            <div className="friends-list">
              {following.map(user => (
                <UserPreview key={user._id} user={user} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default FollowersFollowing;
