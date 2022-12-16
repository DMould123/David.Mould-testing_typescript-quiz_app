import { AnswerObject } from '../pages/Quiz'

type Props = {
  question: string
  answers: string[]
  review: (e: React.MouseEvent<HTMLButtonElement>) => void
  quizzerAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

const Card: React.FC<Props> = ({
  question,
  answers,
  review,
  quizzerAnswer,
  questionNumber,
  totalQuestions
}) => (
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
                quizzerAnswer?.correctAnswer === answer ? 'turqoise' : ''
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

export default Card
