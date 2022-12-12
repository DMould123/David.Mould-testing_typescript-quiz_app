import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from '../src/pages/Home'
import Quiz from './pages/Quiz'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
