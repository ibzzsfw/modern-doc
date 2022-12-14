import { render, screen, fireEvent } from '@testing-library/react'
import ShareModal from '@components/ShareModal'

describe('ShareModal', () => {
  it('should render correctly', () => {
    const { container } = render(<ShareModal />)
    expect(container).toBeInTheDocument()
  })
  it('should render correctly with custom button', () => {
    const { container } = render(
      <ShareModal customButton={<div>Custom button</div>} />
    )
    expect(container).toBeInTheDocument()
  })
  it('should open modal when click on button', () => {
    render(<ShareModal customButton={<div>Custom button</div>} />)
    fireEvent.click(screen.getByText('Custom button'))
    expect(screen.getByText('เพิ่มเอกสารที่แชร์ร่วมกัน')).toBeInTheDocument()
  })
})