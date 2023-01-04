import { shuffleQuestionArray } from '../utils'
import { Difficulties } from '../Enums/Difficulties'
import { Categories } from '../Enums/Categories'
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
  category: Categories,
  difficulty: Difficulties
) => {
  try {
    const endpoint = `https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${randomiseDifficulties(
      difficulty
    )}
  `
    const data = await (await fetch(endpoint)).json()
    console.log(data)
    return data.map((question: Question) => ({
      ...question,
      answers: shuffleQuestionArray([
        ...question.incorrectAnswers,
        question.correctAnswer
      ])
    }))
  } catch (error) {
    console.log(error)
    return error
  }
}
