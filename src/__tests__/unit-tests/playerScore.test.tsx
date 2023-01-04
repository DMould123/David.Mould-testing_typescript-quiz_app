import { ScoreCalc } from '../../QuizConfig'

describe('ScoreCalc', () => {
  it('should calculate the score correctly', () => {
    const seconds = 10
    const difficultyPoint = 1
    const guessedAnswers = 3
    const combo = 3
    const expectedScore = 19

    const score = ScoreCalc(seconds, difficultyPoint, guessedAnswers, combo)
    expect(score).toBe(expectedScore)
  })
})
