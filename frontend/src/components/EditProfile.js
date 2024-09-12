import React, { Component } from 'react';
import './EditProfile.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: props.user.name || '',
        email: props.user.email || '',
        bio: props.user.bio || '',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.formData);
  };

  render() {
    const { formData } = this.state;
    return (
      <div className="edit-profile-component">
        <h2>Edit Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={this.handleChange}
            required
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={this.handleChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
