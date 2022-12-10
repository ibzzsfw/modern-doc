import { render, screen, fireEvent } from '@testing-library/react'
import DocumentBlankBox from '@components/DocumentBlankBox'

describe('DocumentBlankBox', () => {
    it('should render', () => {
      const { container } = render(<DocumentBlankBox />)
      expect(container).toBeInTheDocument()
    })
})