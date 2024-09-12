import React, { Component } from 'react';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import PlaylistsList from '../components/PlaylistsList';
import FollowersFollowing from '../components/Followers';
import CreatePlaylist from '../components/CreatePlaylist';
//import './Profile.css';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user || { name: '', email: '', bio: '' },
      playlists: props.playlists || [],
      songs: props.songs || [],
      followers: props.followers || [],
      following: props.following || [],
    };

    this.handleSaveProfile = this.handleSaveProfile.bind(this);
    this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this);
  }

  handleSaveProfile(updatedUser) {
    this.setState({ user: updatedUser });
  }

  handleCreatePlaylist(name) {
    const newPlaylist = { id: this.state.playlists.length + 1, name };
    this.setState((prevState) => ({
      playlists: [...prevState.playlists, newPlaylist],
    }));
  }

  render() {
    const { user, playlists, songs, followers, following } = this.state;

    return (
      <div className="profile-page">
        <Profile user={user} />
        <EditProfile user={user} onSave={this.handleSaveProfile} />
        <PlaylistsList playlists={playlists} songs={songs} />
        <FollowersFollowing followers={followers} following={following} />
        <CreatePlaylist onCreate={this.handleCreatePlaylist} />
      </div>
    );
  }
}

export default ProfilePage;
