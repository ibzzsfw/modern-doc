import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Login from 'src/views/components/Login.component'

describe('DocumentBlankBox', () => {
  process.env.VITE_USE_OTP_AUTH = 'false'
  it('should render', () => {
    const { container } = render(<Login />)
    expect(container).toBeInTheDocument()
  })
  it('changes the text after click', () => {
    const { getByText } = render(<Login />)
    fireEvent.click(getByText('Login'))
    expect(getByText('Login')).toBeInTheDocument()
  })
  test('enter phone number', () => {
    const { getByPlaceholderText } = render(<Login />)
    fireEvent.change(getByPlaceholderText('กรอกเบอร์โทรศัพท์'), {
      target: { value: '0929574869' },
    })
    expect(getByPlaceholderText('กรอกเบอร์โทรศัพท์')).toHaveValue('0929574869')
  })
})
