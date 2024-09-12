import React, { Component } from 'react';
import './ProfileComponent.css';

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="profile-component">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Bio: {user.bio}</p>
        {/* Add more profile information as needed */}
      </div>
    );
  }
}

export default Profile;
