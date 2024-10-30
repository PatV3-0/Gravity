import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = (props) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showForms, setShowForms] = useState(false); // New state for form visibility

  const profileImages = [
    "https://thedakotaplanet.com/wp-content/uploads/2022/09/thumbnail_IMG_2981-900x900.png",
    "https://ih1.redbubble.net/image.643566589.4825/gbrf,8x10,f,540x540-pad,450x450,f8f8f8.u5.jpg",
    "https://image.spreadshirtmedia.com/image-server/v1/compositions/T210A2PA4301PT17X39Y0D1028750029W25298H30358/views/1,width=550,height=550,appearanceId=2,backgroundColor=000000,noPt=true/question-mark-soos-gravity-dipper-falls-mystery-mens-t-shirt.jpg"
  ];

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
      default:
        break;
    }
  };

  const handleLogin = async () => {
    const url = '/api/login';
    const data = { email, password };

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
      props.handleLogin(user); 
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async () => {
    const imageIndex = Math.floor(Date.now() / 1000) % profileImages.length; // Cyclic index based on timestamp
    const selectedProfileImage = profileImages[imageIndex];
    
    const url = '/api/signup';
    const data = { fullName, username, surname, email, password, profileImage: selectedProfileImage };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      alert("Welcome aboard! Log in to get started!");
      handleToggle();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="splash-page">
      <div className="form-container">
        {error && <p className="error">{error}</p>}
        
        {/* Button to show forms */}
        {!showForms && (
          <button className="buttonSplash" onClick={() => setShowForms(true)}>
            Join the Fun
          </button>
        )}

        {/* Show login/register forms if showForms is true */}
        {showForms && (
          <>
            {isLogin ? (
              <>
                <h2>Login</h2>
                <div className="insideLogin">
                  <div className="logoLogin"></div>
                  <form onSubmit={handleSubmit}>
                    <div className="fields">
                      <label htmlFor="email">Email:</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                        required 
                        autoComplete="email" 
                      />
                    </div>
                    <div className="fields">
                      <label htmlFor="password">Password:</label>
                      <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={handleChange} 
                        placeholder="Password" 
                        required 
                        autoComplete="current-password" 
                      />
                    </div>
                    <button type="submit" className="buttonSplash">Login</button>
                  </form>
                  <p>Don&#39;t have an account?</p>
                  <button className="buttonSplash" onClick={handleToggle}>Sign Up</button>
                </div>
              </>
            ) : (
              <>
                <h2>Register</h2>
                <div className="insidesignup">
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <label htmlFor="username">Username:</label>
                      <input 
                        type="text" 
                        name="username" 
                        value={username} 
                        onChange={handleChange} 
                        placeholder="Username" 
                        required 
                        autoComplete="username" 
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="name">Full name:</label>
                      <input 
                        type="text" 
                        name="fullName" 
                        value={fullName} 
                        onChange={handleChange} 
                        placeholder="Full Name" 
                        required 
                        autoComplete="name" 
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="surname">Surname:</label>
                      <input 
                        type="text" 
                        name="surname" 
                        value={surname} 
                        onChange={handleChange} 
                        placeholder="Surname" 
                        required 
                      />  
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email:</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                        required 
                        autoComplete="email" 
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="password">Password:</label>
                      <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={handleChange} 
                        placeholder="Password" 
                        required 
                        autoComplete="new-password" 
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="confirmPassword">Confirm password:</label>
                      <input 
                        type="password" 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        onChange={handleChange} 
                        placeholder="Confirm Password" 
                        required 
                        autoComplete="new-password" 
                      />  
                    </div>
                    <button className="buttonSplash" type="submit">Sign Up</button>
                  </form>
                  <p>Already have an account?</p>
                  <button className="buttonSplash" onClick={handleToggle}>Log In</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SplashPage;
