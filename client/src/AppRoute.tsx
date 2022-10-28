import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@pages/LoginPage'
import MyProfile from '@pages/MyProfile'
import PageContainer from '@components/PageContainer'
import Home from '@pages/Home'
import MyDocument from '@pages/MydocumentPage'
import File from '@/pages/Folder'
import Error from '@pages/Error'
import { VStack } from '@chakra-ui/react'
import OTPVerify from './components/OTPVerify'

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
          <Route
            path="/home"
            element={
              <>
                <PageContainer>
                  <Home />
                </PageContainer>
              </>
            }
          />
          <Route path="/info" element={<h1>info</h1>} />
          <Route
            path="/myprofile"
            element={
              <>
                <PageContainer>
                  <MyProfile />
                </PageContainer>
              </>
            }
          />
          <Route
            path="/otpverify"
            element={
              <>
                <PageContainer>
                  <OTPVerify />
                </PageContainer>
              </>
            }
          />
          <Route
            path="/folder"
            element={
              <>
                <PageContainer>
                  <File />
                </PageContainer>
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <PageContainer>
                  <Error />
                </PageContainer>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoute
