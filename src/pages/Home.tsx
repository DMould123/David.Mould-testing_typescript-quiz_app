import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [name, setName] = useState<string>('')

  const navigate = useNavigate()

  const addName = (e: ChangeEvent<HTMLInputElement>): void =>
    setName(e.target.value)

  const continueQuiz = (): void => {
    localStorage.setItem('name', name)
    navigate('/quiz')
  }

  return (
    <div id="home">
      <input type="text" placeholder="Name..." onChange={addName} />
      <button disabled={!name} onClick={continueQuiz}>
        Continue
      </button>
    </div>
  )
}
