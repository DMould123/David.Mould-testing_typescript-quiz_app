//Available difficulties to select
export const difficultySelections = [
  { ref: 'EASY', name: 'easy' },
  { ref: 'MEDIUM', name: 'medium' },
  { ref: 'HARD', name: 'hard' },
  { ref: 'RANDOM', name: 'random' }
]

//Available categories to select
export const categorySelections = [
  {
    id: 'arts_and_literature',
    name: 'Arts & Literature'
  },
  {
    id: 'film_and_tv',
    name: 'Film & TV'
  },
  {
    id: 'food_and_drink',
    name: 'Food & Drink'
  },
  {
    id: 'general_knowledge',
    name: 'General Knowledge'
  },
  {
    id: 'geography',
    name: 'Geography'
  },
  {
    id: 'history',
    name: 'History'
  },
  {
    id: 'music',
    name: 'Music'
  },
  {
    id: 'science',
    name: 'Science'
  },
  {
    id: 'society_and_culture',
    name: 'Society & Culture'
  },
  {
    id: 'sport_and_leisure',
    name: 'Sport & Leisure'
  }
]

//Point scores for available difficulty
export const DIFFICULTY_SCORING: any = {
  easy: 1,
  medium: 3,
  hard: 5,
  incorrect: 0
}

export const URL = 'https://the-trivia-api.com/api/questions?'

export const TOTAL_QUESTIONS: number = 4

export const QUESTION_COUNTDOWN: number = 30

//Function to calculate the bonus score system
export function ScoreCalc(
  seconds: number,
  difficultyPoints: number,
  guessedAnswers: string | number | any,
  combo: number
): number {
  let bonus = combo > 2 ? combo : 0
  let result = seconds * difficultyPoints + guessedAnswers * bonus
  return result
}

const Config = {
  totalQuestions: TOTAL_QUESTIONS,
  url: URL,
  questionCountdown: QUESTION_COUNTDOWN
}

export default Config
