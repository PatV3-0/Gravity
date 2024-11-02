import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../userContext';
import Logo from '../../public/assets/images/logo.png';

const Header = () => {
  const { currentUser } = useUser();

  return (
    <header className="header">
      <nav>
        <Link to="/home">
          <img className="logo" src={Logo} alt="Home Link"/>
        </Link>
        <Link to="/home">
          <h3>Gravity</h3>
        </Link>
        <ul className="nav-list">
          {currentUser && (
            <li><Link to={`/library/${currentUser._id}`}>Library</Link></li>
          )}
          {currentUser && (
            <li><Link to={`/profile/${currentUser._id}`}>Profile</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
