import React, {StrictMode}from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// import {combineRecuders, createStore} from 'redux'; 
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <StrictMode>
      <App />
    </StrictMode>
  </Router>
);


