import React, { useState } from 'react'
import { fetchQuestions, QuestionGrab } from '../components/API'
import Loading from '../images/loading.gif'
import Card from '../../src/components/Card'
import { difficultySelections, categorySelections } from '../QuizConfig'
import { Difficulty } from '../Enums/Difficulty'
import { Categories } from '../Enums/Categories'

const TOTAL_QUESTIONS = 9

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const Quiz = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<QuestionGrab[]>([])
  const [number, setNumber] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)
  const [quizzerAnswers, setQuizzerAnswers] = useState<AnswerObject[]>([])
  const [total, setTotal] = useState<number>(0)
  const [complete, setComplete] = useState<boolean>(false)
  const [difficulty, setDifficulty] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const randomCategories = categorySelections.sort(() => Math.random() - 0.5)
  const player = localStorage.getItem('user')
  console.log(questions)

  const startQuiz = async () => {
    setComplete(false)
    setLoading(true)
    setGameOver(false)
    if (!difficulty) {
      setDifficulty('easy')
    }

    const newGame = await fetchQuestions(
      (difficulty || 'easy') as Difficulty,
      category as Categories
    )
    setQuestions(newGame)
    setTotal(0)
    setQuizzerAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const reviewAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[number].correctAnswer === answer

      if (correct) setTotal((prev) => prev + 1)
      setCategory('')
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        difficultySelections: difficulty,
        correctAnswer: questions[number].correctAnswer
      }
      setQuizzerAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  const handleNext = () => {
    if (number < TOTAL_QUESTIONS - 1) setNumber((prev) => prev + 1)
    else setComplete(true)
  }

  const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value)
  }

  return (
    <div className="Quiz">
      <h1>Quiz Time</h1>
      <h3>Player: {player}</h3>
      {!gameOver ? <p>Score: {total}</p> : null}
      {!difficulty && (
        <>
          <p>Select Difficulty</p>
          <select onChange={handleDifficulty}>
            {difficultySelections.map((selections, index) => (
              <option value={selections.name} key={index}>
                {selections.ref}
              </option>
            ))}
          </select>
        </>
      )}
      {!category && (
        <>
          <p>Select Category</p>
          <select onChange={(e) => setCategory(e.target.value)}>
            {randomCategories.slice(0, 3).map((selections, index) => (
              <option value={selections.id} key={index}>
                {selections.name}
              </option>
            ))}
          </select>
        </>
      )}
      {loading ? <img src={Loading} alt="loading" /> : null}
      {!loading && !gameOver && (
        <Card
          questionNumber={number + 1}
          question={questions[number].question}
          answers={questions[number].answers}
          totalQuestions={TOTAL_QUESTIONS}
          quizzerAnswer={quizzerAnswers ? quizzerAnswers[number] : undefined}
          review={reviewAnswer}
        />
      )}
      {gameOver || quizzerAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          Start!
        </button>
      ) : null}
      {!loading &&
      !gameOver &&
      quizzerAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={handleNext}>
          Next Question
        </button>
      ) : null}
    </div>
  )
}

export default Quiz
