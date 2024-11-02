import React, { Component } from 'react';

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="profile-component">
        <h2>{user.name} {user.surname}</h2>
        <p> &#64;{user.username}</p>
      </div>
    );
  }
}

export default Profile;
