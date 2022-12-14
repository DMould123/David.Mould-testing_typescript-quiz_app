import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const addName = (e: ChangeEvent<HTMLInputElement>): void =>
    setName(e.target.value)

  const continueQuiz = (): void => {
    localStorage.setItem('name', JSON.stringify(name))
    navigate('/quiz')
  }

  const quizzer = localStorage.getItem('name')

  return (
    <div id="home">
      <p>{quizzer}</p>
      <input type="text" placeholder="State your Name" onChange={addName} />
      <button disabled={!name} onClick={continueQuiz}>
        Continue
      </button>
    </div>
  )
}
