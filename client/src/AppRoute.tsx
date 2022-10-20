import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@pages/LoginPage'
import PageContainer from '@components/PageContainer'
import MyDocument from '@pages/MyDocument'
import { VStack } from '@chakra-ui/react'

const AppRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/mydocument"
            element={
              <>
                <PageContainer breadcrumb>
                  <MyDocument />
                </PageContainer>
              </>
            }
          />
          <Route path="/info" element={<h1>info</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoute
