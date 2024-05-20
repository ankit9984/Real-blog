import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navbar from './components/Navbar'
import PostPage from './pages/PostPage'

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Register/>} />
          <Route path='/new-story' element={<PostPage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
