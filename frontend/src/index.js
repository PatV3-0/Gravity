import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from './UserContext'; // Import UserProvider

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <UserProvider> 
      <App />
    </UserProvider>
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
