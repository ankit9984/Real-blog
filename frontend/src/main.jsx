import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { PostProvider } from './context/PostContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </AuthProvider>
  </React.StrictMode>,
)
