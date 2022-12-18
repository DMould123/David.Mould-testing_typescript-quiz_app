export const difficultySelections = [
  { ref: 'EASY', name: 'easy' },
  { ref: 'MEDIUM', name: 'medium' },
  { ref: 'HARD', name: 'hard' },
  { ref: 'RANDOM', name: 'random' }
]

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

export const URL = 'https://the-trivia-api.com/api/questions?'

export const TOTAL_QUESTIONS: number = 9

export const QUESTION_COUNTDOWN: number = 30

export const DIFFICULTY_SCORING = { easy: 1, medium: 3, hard: 5 }

const Config = {
  totalQuestions: TOTAL_QUESTIONS,
  url: URL,
  questionCountdown: QUESTION_COUNTDOWN,
  difficultyScoring: DIFFICULTY_SCORING
}

export default Config
