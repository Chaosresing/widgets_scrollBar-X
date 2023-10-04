import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './vendor/reportWebVitals/reportWebVitals';

import './vendor/normalize.css';
import './index.css';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
