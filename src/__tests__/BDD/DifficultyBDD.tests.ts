import { loadFeature, defineFeature } from 'jest-cucumber'
import { Difficulties } from '../../Enums/Difficulties'

const feature = loadFeature('./specs/features/difficulty.feature')

export const getDifficulty = (difficulty: string): Difficulties => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  let value = (<any>Difficulties)[difficulty] as Difficulties
  if (value === undefined) new Error('404 not found')
  return value
}

defineFeature(feature, (test) => {
  let selectedDifficulty: Difficulties

  test('Select difficulty', ({ given, when, then }) => {
    given(/^Selected difficulty: ([a-zA-Z]+)$/, (difficulty) => {
      selectedDifficulty = getDifficulty(difficulty)
    })

    when('Is selected correct', () => {
      if (selectedDifficulty !== Difficulties.Easy) new Error('404 not found')
    })

    then(/^Selected difficulty is: ([a-zA-Z]+)$/, (expected) => {
      expect(selectedDifficulty).toBe(expected)
    })
  })
})
