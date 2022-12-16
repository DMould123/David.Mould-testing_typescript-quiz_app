import React, { useState } from 'react'
import { fetchQuestions, QuestionGrab } from '../components/API'
import Loading from '../images/loading.gif'
import { Card } from '../components/Card'
import {
  difficultySelections,
  categorySelections,
  TOTAL_QUESTIONS
} from '../QuizConfig'
import { Difficulties } from '../Enums/Difficulties'
import { Categories } from '../Enums/Categories'

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
  difficultySelection: string
}

export const Quiz = () => {
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
    setNumber(0)
    setLoading(true)
    setGameOver(false)
    if (!difficulty) {
      setDifficulty('easy')
    }

    const newGame = await fetchQuestions(
      category as Categories,
      (difficulty || 'easy') as Difficulties
    )
    setQuestions(newGame)
    setTotal(0)
    setQuizzerAnswers([])
    setLoading(false)
  }

  const reviewAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[0].correctAnswer === answer

      if (correct) setTotal((prev) => prev + 1)
      setCategory('')
      const answerObject = {
        question: questions[0].question,
        answer,
        correct,
        difficultySelection: difficulty,
        correctAnswer: questions[0].correctAnswer
      }
      setQuizzerAnswers((prev) => [...prev, answerObject])
    }
  }

  const handleNext = async () => {
    const newGame = await fetchQuestions(
      category as Categories,
      difficulty as Difficulties
    )

    setQuestions(newGame)

    if (number === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setComplete(true)
    }
  }

  return (
    <div className="Quiz">
      <h1>Quiz Time</h1>
      <h3>Player: {player}</h3>
      {!gameOver ? <p>Score: {total}</p> : null}
      {!difficulty && (
        <>
          <p>Select Difficulty</p>
          <select onChange={(e) => setDifficulty(e.target.value)}>
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
          question={questions[0].question}
          answers={questions[0].answers}
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
      {!gameOver &&
      !loading &&
      quizzerAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button
          onClick={() => {
            handleNext()
          }}
        >
          Next Question
        </button>
      ) : null}
    </div>
  )
}
