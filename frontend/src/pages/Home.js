import React, { Component } from 'react';
import Feed from '../components/Feed';
import SearchInput from '../components/SearchInput';
// import './HomePage.css'; // Optional: for styling

class Home extends Component {
  render() {
    const { playlists, songs, onSearch } = this.props;

    return (
      <div className="home-page">
        <SearchInput onSearch={onSearch} />
        <Feed playlists={playlists} songs={songs} />
      </div>
    );
  }
}

export default Home;
