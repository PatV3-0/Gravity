import React, { Component } from 'react';
import './EditProfile.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: props.user.username || '',
        profileImage: props.user.profileImage || '',
        password: '',
        confirmPassword: '',
      },
      error: '',
      updateMessage: '',
      showUsername: false,
      showProfileImage: false,
      showPassword: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
      error: '', // Clear error message on input change
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { user } = this.props; 
    const userId = this.extractUserIdFromURL(); 
    const { formData } = this.state;

    if (!userId) {
      this.setState({ error: 'User ID is missing.' });
      return;
    }

    if (formData.password && formData.password === user.password) {
      this.setState({ error: 'New password must not match the old password.' });
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      this.setState({ error: 'Passwords do not match.' });
      return;
    }

    const updatedData = {};
    if (this.state.showUsername && formData.username) updatedData.username = formData.username;
    if (this.state.showProfileImage && formData.profileImage) updatedData.profileImage = formData.profileImage;
    if (this.state.showPassword && formData.password) {
      updatedData.password = formData.password; 
      updatedData.oldPassword = user.password; 
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), 
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      this.props.onSave(updatedUser); 

      const messages = [];
      if (this.state.showUsername && formData.username) messages.push('Username updated!');
      if (this.state.showProfileImage && formData.profileImage) messages.push('Profile Image updated!');
      if (this.state.showPassword && formData.password) messages.push('Password updated!');

      this.setState({ updateMessage: messages.join(' ') });
    } catch (error) {
      console.error(error.message);
      this.setState({ error: 'Error updating user profile. Please try again.' });
    }
  };

  extractUserIdFromURL() {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1]; 
  }

  toggleField = (field) => {
    this.setState((prevState) => ({
      [field]: !prevState[field],
      updateMessage: '', 
    }));
  };

  handleDeleteProfile = async () => {
    const userId = this.extractUserIdFromURL();
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      alert('Profile deleted successfully.'); // Notify the user
      // Optionally redirect to another page
    } catch (error) {
      console.error(error.message);
      this.setState({ error: 'Error deleting profile. Please try again.' });
    }
  };

  render() {
    const { formData, error, updateMessage } = this.state;
    return (
      <div className="edit-profile-component">
        <h2>Edit Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <button type="button" onClick={() => this.toggleField('showUsername')}>
            {this.state.showUsername ? 'Hide Username' : 'Edit Username'}
          </button>
          {this.state.showUsername && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={this.handleChange}
            />
          )}

          <button type="button" onClick={() => this.toggleField('showProfileImage')}>
            {this.state.showProfileImage ? 'Hide Profile Image' : 'Edit Profile Image'}
          </button>
          {this.state.showProfileImage && (
            <input
              type="text"
              name="profileImage"
              placeholder="Profile Image URL"
              value={formData.profileImage}
              onChange={this.handleChange}
            />
          )}

          <button type="button" onClick={() => this.toggleField('showPassword')}>
            {this.state.showPassword ? 'Hide Password' : 'Edit Password'}
          </button>
          {this.state.showPassword && (
            <>
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={this.handleChange}
              />
            </>
          )}

          <button type="submit">Save Changes</button>
          <button type="button" onClick={this.handleDeleteProfile}>Delete Profile</button>
        </form>
        {error && <div className="error">{error}</div>}
        {updateMessage && <div className="update-message">{updateMessage}</div>}
      </div>
    );
  }
}

export default EditProfile;
