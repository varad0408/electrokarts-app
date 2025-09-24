import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { setupApiInterceptors } from './api/apiClient.js'; // 1. IMPORT
import './styles/globals.css';

setupApiInterceptors(store); // 2. CALL THE SETUP FUNCTION

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);