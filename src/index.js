import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
