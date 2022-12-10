import { render, screen, fireEvent } from '@testing-library/react'
import DocumentBox from '@components/DocumentBox'

describe('DocumentBox', () => {
    it('should render', () => {
      const { container } = render(<DocumentBox type={'generatedFolder'} id={''} title={''} />)
      expect(container).toBeInTheDocument()
    })
    
})
