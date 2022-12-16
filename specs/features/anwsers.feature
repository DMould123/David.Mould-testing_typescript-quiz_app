Feature: Answers

  Scenario:Check correct anwser
    Given correct: correctAnswer incorrect: incorrectAnswers
    When Calling the function to check answer
    Then the result should be correctAnswer
