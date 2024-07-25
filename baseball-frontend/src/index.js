import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const ticket = ReactDOM.createRoot(document.getElementById('ticket'));
ticket.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
