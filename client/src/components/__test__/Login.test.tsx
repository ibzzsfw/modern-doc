import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Login from '@components/Login'


describe('DocumentBlankBox', () => {
    it('render correctly', () => {
      const {container} = render(<Login />)
      expect(screen.getByLabelText('เบอร์โทรศัพท์')).toBeInTheDocument()
  })
})

