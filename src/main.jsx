import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './context'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initFirebase } from './constants/services/firebase'
import './index.css'

initFirebase()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
  // </React.StrictMode>,
)
