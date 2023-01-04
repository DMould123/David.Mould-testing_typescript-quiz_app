import React, { useEffect, useState } from 'react'
import { fetchQuestions, QuestionGrab } from '../components/API'
import Loading from '../images/loading.gif'
import { Card } from '../components/Card'
import {
  TOTAL_QUESTIONS,
  difficultySelections,
  categorySelections,
  QUESTION_COUNTDOWN,
  DIFFICULTY_SCORING,
  ScoreCalc
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
  const [difficulty, setDifficulty] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [questionClock, setQuestionClock] = useState<boolean>(false)
  const [pauseTime, setPauseTime] = useState<boolean>(false)
  const [pauseCountDown, setPauseCountdown] = useState<number>(3)
  const [questionCountdown, setQuestionCountdown] =
    useState<number>(QUESTION_COUNTDOWN)

  //randomise Categories
  const randomCategories = categorySelections.sort(() => Math.random() - 0.5)

  //set timer
  useEffect(() => {
    if (questionClock) {
      const completedTime: number = 0
      if (questionCountdown > completedTime) {
        setTimeout(() => {
          setQuestionCountdown(questionCountdown - 1)
        }, 1000)
      }
    }
  }, [questionClock, questionCountdown])

  useEffect(() => {
    if (pauseTime) {
      const completedTime: number = 0
      if (pauseCountDown > completedTime) {
        setTimeout(() => {
          setPauseCountdown(pauseCountDown - 1)
        }, 1000)
      }

      if (pauseCountDown === completedTime) {
        setPauseTime(false)
        setPauseCountdown(3)
      }
    }
  }, [pauseTime, pauseCountDown])

  //Start quiz
  const startQuiz = async () => {
    setPauseTime(true)
    setNumber(0)
    setLoading(true)
    setGameOver(false)
    setQuestionClock(true)
    setQuestionCountdown(QUESTION_COUNTDOWN + pauseCountDown)
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

  //Review answer and update player score
  const reviewAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[0].correctAnswer === answer

      setQuestionClock(false)

      if (correct) {
        const seconds = questionCountdown
        const difficultyPoints = DIFFICULTY_SCORING[difficulty]

        const attemptedAnswers = quizzerAnswers.filter(
          (answer) => answer.correct
        ).length

        const combo = quizzerAnswers.reduce((acc, answer) => {
          if (answer.correct) {
            return acc + 1
          } else {
            return 0
          }
        }, 0)

        setTotal(
          (prev) =>
            prev + ScoreCalc(seconds, difficultyPoints, attemptedAnswers, combo)
        )

        setCategory('')
      }

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

  //Intialie next question
  const handleNext = async () => {
    setPauseTime(true)
    setNumber((prev) => prev + 1)
    setQuestionClock(true)
    setQuestionCountdown(QUESTION_COUNTDOWN + pauseCountDown)

    const newGame = await fetchQuestions(
      category as Categories,
      difficulty as Difficulties
    )

    setQuestions(newGame)

    if (number === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber((prev) => prev)
    }
  }

  //Retrieve player name value from local storage
  const player = localStorage.getItem('user')

  return (
    <div>
      {pauseTime ? (
        <h3 className="countdown">{pauseCountDown}</h3>
      ) : (
        <>
          <div className="Quiz">
            <h1
              style={{
                fontSize: '30px',
                color: 'darkturquoise',
                textDecoration: 'underline',
                fontStyle: 'italic'
              }}
            >
              Quiz Time
            </h1>
            <h3>Player: {player}</h3>
            {!gameOver && <h3>Time left: {questionCountdown}</h3>}
          </div>

          {!category && quizzerAnswers.length < TOTAL_QUESTIONS ? (
            <>
              <select
                style={{
                  fontSize: '20px',
                  color: 'black',
                  backgroundColor: 'gold'
                }}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category</option>
                {randomCategories.slice(0, 3).map((selections, index) => (
                  <option value={selections.id} key={index}>
                    {selections.name}
                  </option>
                ))}
              </select>
            </>
          ) : null}
        </>
      )}

      {!difficulty && (
        <>
          <select
            style={{
              fontSize: '20px',
              color: 'black',
              backgroundColor: 'gold'
            }}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Select Difficulty</option>
            {difficultySelections.map((selections, index) => (
              <option value={selections.name} key={index}>
                {selections.ref}
              </option>
            ))}
          </select>
        </>
      )}

      {!gameOver && quizzerAnswers.length >= TOTAL_QUESTIONS && (
        <p className="total">Total: {total}</p>
      )}

      {gameOver || quizzerAnswers.length === TOTAL_QUESTIONS ? (
        <>
          <button style={{ backgroundColor: 'hotpink' }} onClick={startQuiz}>
            Start!
          </button>
        </>
      ) : null}

      {loading ? <img src={Loading} alt="loading" /> : null}
      {!loading && !gameOver && !pauseTime && (
        <Card
          questionNumber={number + 1}
          question={questions[0].question}
          answers={questions[0].answers}
          totalQuestions={TOTAL_QUESTIONS}
          quizzerAnswer={quizzerAnswers ? quizzerAnswers[number] : undefined}
          review={reviewAnswer}
          questionCountdown={questionCountdown}
        />
      )}

      {!gameOver &&
      !loading &&
      quizzerAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 &&
      category ? (
        <button
          style={{ backgroundColor: 'orange', fontSize: '18px' }}
          onClick={handleNext}
        >
          Next Question
        </button>
      ) : null}

      {!gameOver && !loading && questionCountdown === 0 ? (
        <button
          style={{ backgroundColor: 'orange', fontSize: '18px' }}
          onClick={handleNext}
        >
          Next question
        </button>
      ) : null}
    </div>
  )
}
