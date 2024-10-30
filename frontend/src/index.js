import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { UserProvider } from './userContext';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
    <UserProvider> 
      <App />
    </UserProvider>
);

if (module.hot) {
  module.hot.accept();
}
