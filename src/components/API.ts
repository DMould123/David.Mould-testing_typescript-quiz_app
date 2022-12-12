import { shuffleQuestionArray } from '../utils'

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  RANDOM = 'random'
}

export enum Categories {
  RANDOM = 'random'
}

export type Question = {
  category: string
  correctAnswer: string
  difficulty: string
  incorrectAnswers: string[]
  question: string
  type: string
  regions: string[]
}

export type QuestionGrab = Question & { answers: string[] }

export const fetchQuestions = async (
  limit: number,
  difficulty: Difficulty,
  categories: Categories
) => {
  const endpoint = `https://the-trivia-api.com/api/questions?categories=${categories}&limit=${limit}&region=SE&difficulty=${difficulty}`
  const data = await (await fetch(endpoint)).json()
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleQuestionArray([
      ...question.incorrectAnswers,
      question.correctAnswer
    ])
  }))
}
