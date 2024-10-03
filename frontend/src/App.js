import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProfilePageWithParams from './pages/Profile'; 
import Playlist from './pages/Playlist';
import Library from './pages/Library';
import About from './pages/About';
import SplashPage from './pages/SplashPage';
import './index.css';
import { useUser } from './UserContext'; // Import useUser

const App = () => {
  const { currentUser, setCurrentUser } = useUser(); 
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    // Example: Fetch users and set currentUser
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user); // Set the current user when they log in
  };

  const handleLogout = () => {
    setCurrentUser(null); // Clear the current user
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SplashPage handleLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route 
          path="/profile/:userId" 
          element={
            <ProfilePageWithParams 
              users={users} 
              loggedInUserId={currentUser ? currentUser._id : ''} 
              onLogout={handleLogout} 
            />} 
        />
        <Route 
          path="/playlists/:id" 
          element={<Playlist currentUser={currentUser} />} 
        />
        <Route path="/library" element={<Library />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
