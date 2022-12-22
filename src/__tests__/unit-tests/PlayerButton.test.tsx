import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../../pages/Home'

test('button should be disabled', () => {
  render(<Home />)
  const buttonEl = screen.getByRole('button')
  expect(buttonEl).toBeDisabled()
})

test('button should not be disabled when inputs exist', () => {
  render(<Home />)
  const buttonEl = screen.getByRole('button')
  const usernameInputEl = screen.getByPlaceholderText(/Player name/i)

  const testValue = 'test'

  fireEvent.change(usernameInputEl, { target: { value: testValue } })

  expect(buttonEl).not.toBeDisabled()
})
