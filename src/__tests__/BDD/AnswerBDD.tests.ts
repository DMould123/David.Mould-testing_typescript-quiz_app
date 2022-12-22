import { loadFeature, defineFeature } from 'jest-cucumber'
import { Categories } from '../../Enums/Categories'

const feature = loadFeature('./specs/features/answers.feature')

export const getCategory = (category: string): Categories => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  let value = (<any>Categories)[category] as Categories
  if (value === undefined) new Error('Category not found')

  return value
}

defineFeature(feature, (test) => {
  let pickedCategory: Categories

  test('Pick a category', ({ given, when, then }) => {
    given(/^category: ([a-zA-Z]+)$/, (category) => {
      pickedCategory = getCategory(category)
    })

    when('Check if the category is correct', () => {
      if (pickedCategory !== Categories.Music) new Error('Category not found')
    })

    then(/^The picked category should be: ([a-zA-Z]+)$/, (expected) => {
      expect(pickedCategory).toBe(expected)
    })
  })
})
