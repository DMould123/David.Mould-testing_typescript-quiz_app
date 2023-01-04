import { render, screen } from '@testing-library/react'
import renderer fom 'react-test-renderer'
import Home from '../../pages/Home'

describe('h1 input should be rendered', () => {
  test('renders out React TypeScript Quiz', () => {
    render(<Home />)
    const title = screen.getByTestId('newtestid')
    expect(title).toBeInTheDocument()
  })
})

describe('Take user to my Github page', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Home page="https://github.com/DMould123">Facebook</Home>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })
})

