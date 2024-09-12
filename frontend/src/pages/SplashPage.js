import React, { Component } from 'react';
import '../../public/assets/css/SplashPage.css'; 

class SplashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState((prevState) => ({
      isLogin: !prevState.isLogin,
    }));
  }

  render() {
    const { isLogin } = this.state;

    return (
      <div className="splash-page">
        <div className="form-container">
          {isLogin ? (
            <div className="login-form">
              <h2>Login</h2>
              <form>
                <input type="email" placeholder="Email" required autoComplete="email" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  required 
                  autoComplete="current-password" 
                />
                <button type="submit">Login</button>
              </form>
              <p>Don&#39;t have an account?</p>
              <button onClick={this.handleToggle}>Sign Up</button>
            </div>
          ) : (
            <div className="signup-form">
              <h2>Sign Up</h2>
              <form>
                <input type="text" placeholder="Full Name" required autoComplete="name" />
                <input type="email" placeholder="Email" required autoComplete="email" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  required 
                  autoComplete="new-password" 
                />
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  required 
                  autoComplete="new-password" 
                />
                <button type="submit">Sign Up</button>
              </form>
              <p>Already have an account?</p>
              <button onClick={this.handleToggle}>Login</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SplashPage;
