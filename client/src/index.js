import './assets/index.scss';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import  store  from "./services/store/store.js";
import App from './App';
import { GlobalProvider } from './services/context/GlobalContext';



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Router>
    <StrictMode>
      <Provider store={store}>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </Provider>
    </StrictMode>
  </Router>
);


