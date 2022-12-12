export const shuffleQuestionArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5)
