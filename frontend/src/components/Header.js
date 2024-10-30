import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../userContext'; // Import useUser

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
          {currentUser && ( // Only show Library link if the user is logged in
            <li><Link to={`/library/${currentUser._id}`}>Library</Link></li>
          )}
          <li><Link to="/">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
