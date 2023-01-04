import { useState } from 'react'

const Home = () => {
  const [playerName, setPlayerName] = useState('')
  const [updatedPlayerName, setUpdatedPlayerName] = useState(playerName)

  console.log(updatedPlayerName)

  const handleChange = (e: {
    // Handel the change in the input field
    target: { value: React.SetStateAction<string> }
  }) => {
    setPlayerName(e.target.value)
  }

  const handleClick = () => {
    // "name" stores inputfield value in local storage and take you to quiz page
    localStorage.setItem('user', JSON.stringify(playerName))
    setUpdatedPlayerName(playerName)
    window.location.href = '/quiz'
  }

  return (
    <>
      <div>
        <h1 data-testid="newtestid">React TypeScript Quiz</h1>
        <p>Please enter your name:</p>
        <input
          className="player-name"
          type="text"
          placeholder="Player name"
          onChange={handleChange}
          value={playerName}
        />

        <button
          className="player-button"
          onClick={handleClick}
          disabled={!playerName}
        >
          Continue
        </button>
      </div>
    </>
  )
}

export default Home
