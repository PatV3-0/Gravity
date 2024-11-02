import React, { Component } from 'react';
import UserPreview from './UserPreview'; 

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
          <div className="followers-comp">
            <h2>Followers</h2>
            <div className="friends-list">
              {followers.map(user => (
                <UserPreview key={user._id} user={user} />
              ))}
            </div>
            </div>
          </>
        )}

        {following && following.length > 0 && (
          <>
          <div className="following-comp">
            <h2>Following</h2>
            <div className="friends-list">
              {following.map(user => (
                <UserPreview key={user._id} user={user} />
              ))}
            </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default FollowersFollowing;
