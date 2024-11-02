import React, { Component } from 'react';

class ProfilePreview extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile-preview">
        <h4>{profile.name}</h4>
        <p>{profile.bio}</p>
      </div>
    );
  }
}

export default ProfilePreview;
