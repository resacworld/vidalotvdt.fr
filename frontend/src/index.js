import React from 'react';
import ReactDOM from 'react-dom/client';
import Store from "./store/index"
import App from './App';
import "./styles/index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Store>
        <App />
      </Store>
  </React.StrictMode>
);
