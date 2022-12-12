import React from 'react'
import { AnswerObject } from '../pages/Quiz'

type reviewProps = {
  question: string
  answers: string[]
  review: (e: React.MouseEvent<HTMLButtonElement>) => void
  quizzerAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

const Card: React.FC<reviewProps> = ({
  question,
  answers,
  review,
  quizzerAnswer,
  questionNumber,
  totalQuestions
}) => (
  <div className="Card">
    <p className="Number">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <div key={answer}>
          <button disabled={!!quizzerAnswer} value={answer} onClick={review}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
)

export default Card
