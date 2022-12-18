import { AnswerObject } from '../pages/Quiz'

type Props = {
  question: string
  answers: string[]
  review: (e: React.MouseEvent<HTMLButtonElement>) => void
  quizzerAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

export const Card = ({
  question,
  answers,
  review,
  quizzerAnswer,
  questionNumber,
  totalQuestions
}: Props) => {
  return (
    <div className="Card">
      <p>
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p>{question}</p>
      <div>
        {answers.map((answer) => (
          <div key={answer}>
            <button
              style={{
                backgroundColor:
                  quizzerAnswer?.correctAnswer === answer ? 'green' : '',
                fontSize: '18px'
              }}
              disabled={!!quizzerAnswer}
              value={answer}
              onClick={review}
            >
              <p>{answer}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
