import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/assets/css/SplashPage.css';

const SplashPage = (props) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Set initial state to true to show login first
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [error, setError] = useState('');

  const handleToggle = () => {
    setIsLogin(prev => !prev);
    setError('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'surname':
        setSurname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'profileImage':
        setProfileImage(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isLogin ? '/api/login' : '/api/signup';
    const data = isLogin ? { email, password } : { fullName, username, surname, email, password, profileImage };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const user = await response.json();
      props.handleLogin(user); // Call the handleLogin method passed from App.js
      navigate('/home'); // Redirect to home page after successful login/signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="splash-page">
      <div className="form-container">
        {error && <p className="error">{error}</p>}
        {isLogin ? (
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="email" 
                name="email" 
                value={email} 
                onChange={handleChange} 
                placeholder="Email" 
                required 
                autoComplete="email" 
              />
              <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={handleChange} 
                placeholder="Password" 
                required 
                autoComplete="current-password" 
              />
              <button type="submit">Login</button>
            </form>
            <p>Don&#39;t have an account?</p>
            <button onClick={handleToggle}>Sign Up</button>
          </div>
        ) : (
          <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="username" 
                value={username} 
                onChange={handleChange} 
                placeholder="Username" 
                required 
                autoComplete="username" 
              />
              <input 
                type="text" 
                name="fullName" 
                value={fullName} 
                onChange={handleChange} 
                placeholder="Full Name" 
                required 
                autoComplete="name" 
              />
              <input 
                type="text" 
                name="surname" 
                value={surname} 
                onChange={handleChange} 
                placeholder="Surname" 
                required 
              />
              <input 
                type="email" 
                name="email" 
                value={email} 
                onChange={handleChange} 
                placeholder="Email" 
                required 
                autoComplete="email" 
              />
              <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={handleChange} 
                placeholder="Password" 
                required 
                autoComplete="new-password" 
              />
              <input 
                type="password" 
                name="confirmPassword" 
                value={confirmPassword} 
                onChange={handleChange} 
                placeholder="Confirm Password" 
                required 
                autoComplete="new-password" 
              />
              <input 
                type="text" 
                name="profileImage" 
                value={profileImage} 
                onChange={handleChange} 
                placeholder="Profile Image URL" 
              />
              <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account?</p>
            <button onClick={handleToggle}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashPage;
