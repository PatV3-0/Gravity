import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../public/assets/css/global.css';
import { UserProvider } from './userContext';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

if (process.env.NODE_ENV === 'production') {
  try {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  } catch (error) {
    console.warn("Sentry initialization blocked or failed:", error);
  }
}

const originalConsoleWarn = console.warn;

console.warn = (...args) => {
  const message = args[0];
  if (
    typeof message === 'string' && 
    (message.includes('Sentry') || message.includes('tracking'))
  ) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

// Media Key System Access
const config = [
  {
    initDataTypes: ['cenc'], 
    audioCapabilities: [
      { contentType: 'audio/mp4; codecs="mp4a.40.2"', robustness: 'SW_SECURE_CRYPTO' },
    ],
    videoCapabilities: [
      { contentType: 'video/mp4; codecs="avc1.42E01E"', robustness: 'SW_SECURE_DECODE' },
    ],
  },
];

navigator.requestMediaKeySystemAccess('com.widevine.alpha', config)
  .then(mediaKeySystemAccess => mediaKeySystemAccess.createMediaKeys())
  .then(mediaKeys => {
    // Use media keys
  })
  .catch(error => console.error('Media Key System Access Error:', error));

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
