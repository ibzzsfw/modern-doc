import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmationModal from '@components/ConfirmationModal'
    
describe('ConfirmationModal', () => {
    it('should render correctly', () => {
        const { container } = render(<ConfirmationModal />)
        expect(container).toBeInTheDocument()
    })
    it('should render modal when open is true', () => {
        const { container } = render(
            <ConfirmationModal
                title="test"
                description="test"
                open={true}
            />
        )
        expect(container).toBeInTheDocument()
    })
})