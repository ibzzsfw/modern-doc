import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@pages/LoginPage'

const AppRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/task" element={<h1>task</h1>} />
          <Route path="/info" element={<h1>info</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoute
