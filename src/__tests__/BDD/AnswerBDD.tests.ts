import { loadFeature, defineFeature } from 'jest-cucumber'

const feature = loadFeature('../../../specs/features/answer.feature')

export function CheckAnswer() {
  return
}

defineFeature(feature, (test) => {
  test('Check right Answers', ({ given, when, then }) => {})
})
