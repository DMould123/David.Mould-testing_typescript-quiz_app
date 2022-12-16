import { shuffleQuestionArray } from '../utils'
import { Difficulty } from '../Enums/Difficulty'
import { Categories } from '../Enums/Categories'
import Config from '../QuizConfig'
import { Question } from '../Interfaces/Question'

const randomiseDifficulties = (difficulty: string) => {
  const difficulties = ['easy', 'medium', 'hard']
  if (difficulty === 'random') {
    return difficulties[Math.floor(Math.random() * difficulties.length)]
  }
  return difficulty
}

export type QuestionGrab = Question & { answers: string[] }

export const fetchQuestions = async (
  difficulty: Difficulty,
  category: Categories
): Promise<QuestionGrab[]> => {
  const endpoint = `${Config.url}limit=${
    Config.totalQuestions
  }&difficulty=${randomiseDifficulties(difficulty)}`
  const data = await (await fetch(endpoint)).json()
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleQuestionArray([
      ...question.incorrectAnswers,
      question.correctAnswer
    ])
  }))
}
