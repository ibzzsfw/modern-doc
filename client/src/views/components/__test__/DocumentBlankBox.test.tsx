import { render, screen, fireEvent } from '@testing-library/react'
import DocumentBlankBox from 'src/views/components/DocumentBlankBox.component'

describe('DocumentBlankBox', () => {
    it('should render', () => {
      const { container } = render(<DocumentBlankBox />)
      expect(container).toBeInTheDocument()
    })
    it('should call onClick', () => {
      const onClick = jest.fn()
      render(<DocumentBlankBox onClick={onClick} />)
      fireEvent.click(screen.getByRole('group'))
      expect(onClick).toHaveBeenCalled()
    })
})