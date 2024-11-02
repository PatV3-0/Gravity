import React, { Component } from 'react';
import Feed from '../components/Feed';
import backsplash from '../../public/assets/images/backing.png';

class Home extends Component {
  render() {
    const { playlists, songs, onSearch } = this.props;

    return (
      <div className="home-page" style={{ backgroundImage: `url(${backsplash})` }}>
        <Feed playlists={playlists} songs={songs} />
      </div>
    );
  }
}

export default Home;
