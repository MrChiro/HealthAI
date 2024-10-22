import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './services/firebase';

try {
  initializeApp(firebaseConfig);
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);