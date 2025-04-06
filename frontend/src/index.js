import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Thêm dòng này
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from "./CartContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
  </CartProvider>

);

reportWebVitals();
