import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from 'src/views/pages/Login.page'
import MyProfile from 'src/views/pages/MyProfile.page'
import PageContainer from 'src/views/components/PageContainer.component'
import HomePage from 'src/views/pages/Home.page'
import Folder from 'src/views/pages/Folder.page'
import Error from 'src/views/pages/Error.page'
import OTPVerify from './views/components/OTPVerify.component'
import FamilyPage from 'src/views/pages/Family.page'
import Test from 'src/views/pages/Test.page'
import SearchPage from 'src/views/pages/Search.page'
import EditDocumentForm from 'src/views/components/EditDocumentForm.component'
import File from 'src/views/pages/File.page'
import FormPage from 'src/views/pages/Form.page'
import AllDocumentPage from 'src/views/pages/AllDocument.page'
import MyDocumentPage from 'src/views/pages/MyDocument.page'

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
                  <MyDocumentPage />
                </PageContainer>
              </>
            }
          />
          <Route
            path="/alldocument/:category"
            element={
              <>
                <PageContainer breadcrumb>
                  <AllDocumentPage />
                </PageContainer>
              </>
            }
          />

          <Route
            path="/home"
            element={
              <>
                <PageContainer breadcrumb>
                  <HomePage />
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
          {/* <Route
            path="/otpverify"
            element={
              <>
                <PageContainer>
                  <OTPVerify />
                </PageContainer>
              </>
            }
          /> */}
          <Route
            path="/folder/:id"
            element={
              <>
                <PageContainer>
                  <Folder />
                </PageContainer>
              </>
            }
          />

          {/**
           *  use type to determine which type of File to render
           * type = 1 => generatedFile
           * type = 2 => uploadedFile
           * type = 3 => userFreeUploadFile
           */}
          <Route
            path="/file/:type/:id"
            element={
              <>
                <PageContainer>
                  <File />
                </PageContainer>
              </>
            }
          />

          <Route
            path="/family"
            element={
              <>
                <PageContainer>
                  <FamilyPage />
                </PageContainer>
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <PageContainer>
                  <SearchPage />
                </PageContainer>
              </>
            }
          />
          <Route
            // path="/folder/:id/form"
            path="/form"
            element={
              <>
                <PageContainer>
                  <FormPage />
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
