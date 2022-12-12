import { render, screen, fireEvent } from '@testing-library/react'
import SearchBox from 'src/views/components/SearchBox.component'

describe('SearchBox', () => {
  it('should render', () => {
    const { container } = render(<SearchBox />)
    expect(container).toBeInTheDocument()
  })

  it('should render value', () => {
    const { container } = render(<SearchBox value="test" />)
    expect(screen.getByTestId('input-search')).toHaveValue('test')
  })

  it('should call onSearchClick when click button', () => {
    const onSearchClick = jest.fn()
    render(<SearchBox onSearchClick={onSearchClick} />)
    fireEvent.click(screen.getByTestId('search-button'))
    expect(onSearchClick).toHaveBeenCalled()
  })
})
