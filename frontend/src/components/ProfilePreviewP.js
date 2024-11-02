import React, { Component } from 'react';
import './ProfilePreview.css';

class ProfilePreviewP extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile-previewP">
        <h4>{profile.name}</h4>
        <p>{profile.bio}</p>
      </div>
    );
  }
}

export default ProfilePreviewP;
