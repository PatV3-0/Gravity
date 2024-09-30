import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import useUser

const Header = () => {
  const { currentUser } = useUser(); // Get current user from context

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/home">Home</Link></li>
          {currentUser && (
            <li><Link to={`/profile/${currentUser._id}`}>Profile</Link></li>
          )}
          <li><Link to="/playlists">Playlist</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
