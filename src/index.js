import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import JS + Popper.js
import 'bootstrap-icons/font/bootstrap-icons.css';  // Import Bootstrap Icons
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>
);

reportWebVitals();
