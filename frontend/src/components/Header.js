import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import useUser

const Header = () => {
  const { currentUser } = useUser(); // Get current user from context

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="max-w-6xl mx-auto">
        <ul className="flex space-x-6">
          <li>
            <Link to="/home" className="hover:underline">Home</Link>
          </li>
          {currentUser && (
            <li>
              <Link to={`/profile/${currentUser._id}`} className="hover:underline">Profile</Link>
            </li>
          )}
          <li>
            <Link to="/playlists" className="hover:underline">Playlist</Link>
          </li>
          <li>
            <Link to="/library" className="hover:underline">Library</Link>
          </li>
          <li>
            <Link to="/" className="hover:underline">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
