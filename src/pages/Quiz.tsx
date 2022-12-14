import React, { useState } from 'react'
import { fetchQuestions, QuestionGrab } from '../components/API'
import Loading from '../images/loading.gif'
import Card from '../../src/components/Card'
import {
  TOTAL_QUESTIONS,
  difficultySelections,
  categorySelections
} from '../config'
import { Difficulty } from '../Enums/Difficulty'
import { Categories } from '../Enums/Categories'

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const Quiz = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionGrab[]>([])
  const [number, setNumber] = useState<number>(0)
  const [gameOver, setGameOver] = useState(true)
  const [quizzerAnswers, setQuizzerAnswers] = useState<AnswerObject[]>([])
  const [total, setTotal] = useState(0)
  const [difficulty, setDifficulty] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const randomCategories = categorySelections.sort(() => Math.random() - 0.5)
  console.log(questions)

  const startQuiz = async () => {
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

      const answerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correctAnswer,
        answer,
        correct
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

  return (
    <div className="Quiz">
      <h1>Quiz</h1>
      {gameOver || quizzerAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          Start!
        </button>
      ) : null}
      {!gameOver ? <p className="total">Total: {total}</p> : null}
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
      {!loading &&
      !gameOver &&
      quizzerAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
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
              <option value={selections.name} key={index}>
                {selections.id}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  )
}

export default Quiz
