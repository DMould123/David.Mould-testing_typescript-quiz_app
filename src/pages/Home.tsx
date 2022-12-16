import React, { useState } from 'react'
import PlayerNameInput from '../components/PlayerNameInput'
import { useNavigate } from 'react-router-dom'
import context from '../Context/QuizContext'

const Home = () => {
  const navigate = useNavigate()

  const [playerName, setPlayerName] = useState('')
  const [updatedPlayerName, setUpdatedPlayerName] = useState(playerName)

  console.log(updatedPlayerName)

  const handleClick = () => {
    // "name" stores input field value in local storage and take you to quiz page
    localStorage.setItem('user', JSON.stringify(playerName))
    setUpdatedPlayerName(playerName)
    navigate('/quiz')
  }

  return (
    <>
      <h1>React TypeScript Quiz</h1>
      <p>Please enter your name:</p>
      <context.Provider value={{ playerName, setPlayerName }}>
        <PlayerNameInput />
        <button onClick={handleClick}>Continue</button>
      </context.Provider>
    </>
  )
}

export default Home
