import { shuffleQuestionArray } from '../utils'
import { Difficulty } from '../Enums/Difficulty'
import { Categories } from '../Enums/Categories'

export type Question = {
  category: string
  correctAnswer: string
  difficulty: string
  incorrectAnswers: string[]
  question: string
  type: string
  regions: string[]
}

const randomiseDifficulties = (difficultySetting: string) => {
  const difficultySettings = ['easy', 'medium', 'hard']
  if (difficultySetting === 'random') {
    return difficultySettings[
      Math.floor(Math.random() * difficultySettings.length)
    ]
  }
  return difficultySetting
}

export type QuestionGrab = Question & { answers: string[] }

export const fetchQuestions = async (
  difficultySetting: Difficulty,
  category: Categories
): Promise<QuestionGrab[]> => {
  const endpoint = `https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${randomiseDifficulties(
    difficultySetting
  )}`
  const data = await (await fetch(endpoint)).json()
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleQuestionArray([
      ...question.incorrectAnswers,
      question.correctAnswer
    ])
  }))
}
