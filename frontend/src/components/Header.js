import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav>
          <ul className="nav-list">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/playlist">Playlist</Link></li>
            <li><Link to="/library">Library</Link></li>
            <li><Link to="/splash">Login</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
