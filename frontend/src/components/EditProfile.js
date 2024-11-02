import React, { Component } from 'react';

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
    this.fileInputRef = React.createRef();
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

  handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            profileImage: reader.result, // Use the image as the profile image
          },
          error: '',
        }));
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  handleDragOver = (e) => {
    e.preventDefault();
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

  const { profileImage, password, confirmPassword } = formData;

  if (
    profileImage && 
    !/^data:image\/|http/.test(profileImage)
  ) {
    this.setState({ error: 'Profile image must be a valid URL or base64-encoded string.' });
    return;
  }

  if (password && password === user.password) {
    this.setState({ error: 'New password must not match the old password.' });
    return;
  }

  if (password && password !== confirmPassword) {
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

  this.setState({ loading: true });

  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update profile');
    }

    const updatedUser = await response.json();
    this.props.onSave(updatedUser); 
    this.props.fetchData(userId); // Reload user data after saving

    const messages = [];
    if (this.state.showUsername && formData.username) messages.push('Username updated!');
    if (this.state.showProfileImage && formData.profileImage) messages.push('Profile Image updated!');
    if (this.state.showPassword && formData.password) messages.push('Password updated!');

    this.setState({ updateMessage: messages.join(' '), loading: false });
  } catch (error) {
    console.error(error.message);
    this.setState({ error: 'Error updating user profile. Please try again.', loading: false });
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
        // Step 1: Fetch the current user's data to get their friends
        const userResponse = await fetch(`/api/users/${userId}`);
        const currentUser = await userResponse.json();

        // Check if the current user exists
        if (!currentUser) {
            throw new Error('User not found');
        }

        // Step 2: Unfriend the current user from all friends
        const friends = currentUser.friends || [];
        for (const friendId of friends) {
            await fetch(`/api/users/${friendId}/removeFriend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friendId: userId }), // Send the current user's ID to unfriend
            });
        }

        // Step 3: Fetch the user's playlists to get the playlist IDs for deletion
        const playlistsResponse = await fetch(`/api/users/${userId}/playlists`);
        const playlists = await playlistsResponse.json();

        // Delete each playlist associated with the user
        for (const playlist of playlists) {
            await fetch(`/api/playlists/${playlist._id}`, {
                method: 'DELETE',
            });
        }

        // Now delete the user profile
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete profile');
        }

        alert('Profile and associated data deleted successfully.'); // Notify the user
        this.props.onLogout(); // Log out the user
        this.props.navigate('/'); // Redirect to home or another page
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
          <button type="button" onClick={() => this.toggleField('showProfileImage')}>
            {this.state.showProfileImage ? 'Hide Profile Image' : 'Edit Profile Image'}
          </button>
          <button type="button" onClick={() => this.toggleField('showPassword')}>
            {this.state.showPassword ? 'Hide Password' : 'Edit Password'}
          </button>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={this.handleDeleteProfile}>Delete Profile</button>
        </form>
        {this.state.showUsername && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={this.handleChange}
            />
          )}
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
          {this.state.showProfileImage && (
            <>
              <div
                className="profile-image-dropzone"
                onDrop={this.handleDrop}
                onDragOver={this.handleDragOver}
                style={{
                  border: '2px dashed #ccc',
                  padding: '20px',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                <p>Drag and drop an image here</p>
              </div>
              <input
                type="text"
                name="profileImage"
                placeholder="Profile Image URL"
                value={formData.profileImage}
                onChange={this.handleChange}
              />
            </>
          )}
        {error && <div className="error">{error}</div>}
        {updateMessage && <div className="update-message">{updateMessage}</div>}
      </div>
    );
  }
}

export default EditProfile;
