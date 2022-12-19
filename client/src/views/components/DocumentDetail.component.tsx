import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text
} from '@chakra-ui/react'
import ConfirmationModal from '@components/ConfirmationModal.component'
import GeneratedDocumentBadge from '@components/DocumentBadge.component'
import TakeNote from '@components/TakeNote.component'
import UploadFile from '@components/UploadFile.component'
import FilePageModel from '@models/FilePage.model'
import FormPageModel from '@models/FormPage.model'
import FieldViewModel from '@view-models/Field.viewmodel'
import GenerateFileViewModel from '@view-models/GenerateFiles.viewmodel'
import Markdown from 'marked-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import shallow from 'zustand/shallow'

type propsType = {
  title: string
  status: string
  description: string | null
  markdown: string
  type?: 'generatedFile' | 'uploadedFile' | 'freeUploadFile' | 'folder' | string
  note?: string
}

const DocumentDetail = ({
  title,
  status,
  description,
  markdown,
  type = 'uploadedFile',
  note,
}: propsType) => {

  const navigate = useNavigate()
  const [comfirmModal, setConfirmModal] = useState(false)
  const [infoModal, setInfoModal] = useState<any>({
    title: '',
    description: '',
  })

  const { file } = FilePageModel((state) => {
    return {
      file: state.file,
    }
  }, shallow)

  const {
    setField,
    document,
    setDocument,
    setDocumentType,
    generatedFile,
    setGeneratedFile,
    selectedFile,
  } = FormPageModel((state) => {
    return {
      setField: state.setField,
      document: state.document,
      setDocument: state.setDocument,
      setDocumentType: state.setDocumentType,
      generatedFile: state.generatedFile,
      setGeneratedFile: state.setGeneratedFile,
      selectedFile: state.selectedFile,
    }
  }, shallow)

  const keepField = [
    'firstname_personal',
    'lastname_personal',
    'sex_personal',
    'birthdate_personal',
    'citizenId_personal',
    'email_personal',
    'title_personal',
  ]


  if (file)
    return (
      <Flex sx={detailsBox}>
        <Flex sx={descriptionBox}>
          <HStack align="center">
            <Heading sx={titleText}>{title}</Heading>
            <GeneratedDocumentBadge status={status} />
            <Spacer />
            {/* <BadgeStatus status={status} /> */}
          </HStack>
          <Box sx={markdownBox}>
            <Markdown value={markdown} />
          </Box>
        </Flex>

        <Box sx={noteBox}>
          <Heading sx={titleText}>บันทึกเตือนความจำ</Heading>
          {description}
        </Box>
        {type === 'generatedFile' ? (<>
          <Flex
            gap="24px"
            marginTop="24px"
          >
            <Button
              sx={newDocumentBtn}
              isDisabled={file.fields.length === 0}
              colorScheme="green"
              onClick={() => {
                setField(
                  file.fields.map((field: FieldViewModel) => {
                    if (keepField.includes(field.name) === false)
                      field.userValue = ''
                    return field
                  })
                )
                setDocument(file)
                navigate('/form')
              }}
            >
              สร้างเอกสารใหม่
            </Button>
            <Button
              sx={editDocumentBtn}
              isDisabled={file.fields.length === 0}
              colorScheme="gray"
              variant="outline"
              onClick={() => {
                setField(file.fields)
                setDocument(file)
                navigate('/form')
              }}
            >
              แก้ไขเอกสารเดิม
            </Button>

            <TakeNote
              doucmentType={file.type}
              documentId={file.id}
              noteContent={file.note}
              documentTitle={title}
              type={'fileNote'}
              customButton={
                <Button colorScheme="gray" variant="outline">
                  แก้ไขบันทึก
                </Button>
              }
            />
          </Flex>
        </>) : null}
        {type === 'folder' ? (
          <>
            <Flex
              gap="24px"
              marginTop="24px"
            >
              <Button
                sx={newDocumentBtn}
                isDisabled={selectedFile.length == 0}
                colorScheme="green"
                onClick={() => {
                  let temp = generatedFile.map((document: GenerateFileViewModel) => {
                    document.fields?.map((field: FieldViewModel) => {
                      if (keepField.includes(field.name) === false)
                        field.userValue = ''
                      return field
                    })
                    return document
                  })
                  setInfoModal({
                    title: 'สร้างเอกสารใหม่',
                    description: (
                      <Text>
                        คุณต้องการสร้างเอกสารใหม่{' '}
                        <Text as="b"> {selectedFile.length} </Text>{' '}
                        รายการหรือไม่
                      </Text>
                    ),
                  })
                  setGeneratedFile(temp)

                  setConfirmModal(true)
                }}
              >
                สร้างเอกสารใหม่
              </Button>
              <Button
                sx={editDocumentBtn}
                isDisabled={selectedFile.length == 0}
                colorScheme="gray"
                variant="outline"
                onClick={() => {
                  setInfoModal({
                    title: 'แก้ไขเอกสารเดิม',
                    description: (
                      <Text>
                        คุณต้องการแก้ไขเอกสาร{' '}
                        <Text as="b"> {selectedFile.length} </Text>{' '}
                        รายการหรือไม่
                      </Text>
                    ),
                  })
                  setConfirmModal(true)
                }}
              >
                แก้ไขเอกสารเดิม
              </Button>
              <TakeNote
                doucmentType={document?.type}
                documentId={document?.id}
                noteContent={document?.note}
                documentTitle={title}
                type={'folderNote'}
                customButton={
                  <Button colorScheme="gray" variant="outline">
                    แก้ไขบันทึก
                  </Button>
                }
              />
            </Flex>
          </>
        ) : (
          type === 'uploadedFile' && (
            <Flex justify="flex-start">
              <TakeNote
                doucmentType={document?.type}
                documentId={document?.id}
                noteContent={document?.note}
                documentTitle={title}
                type={'folderNote'}
                customButton={
                  <Button colorScheme="gray" variant="outline">
                    แก้ไขบันทึก
                  </Button>
                }
              />
            </Flex>
          )
        )}

        {type === 'userFreeUploadFile' && (
          <Flex justify="flex-start">
            <TakeNote
              doucmentType={file.type}
              documentId={file.id}
              noteContent={file.note}
              documentTitle={title}
              type={'fileNote'}
              customButton={
                <Button colorScheme="gray" variant="outline">
                  แก้ไขบันทึก
                </Button>
              }
            />
          </Flex>
        )}
        <Flex justifyContent="flex-start">
          {file.type === 'uploadedFile' && (
            <UploadFile
              customButton={<Button colorScheme="green">อัปโหลดไฟล์</Button>}
              file={file}
            />
          )}
          <ConfirmationModal
            open={comfirmModal}
            setOpen={(value) => {
              setConfirmModal(value)
            }}
            title={infoModal.title}
            description={infoModal.description}
            documentItem={selectedFile}
            onClick={() => {
              navigate('/form')
            }}
          />
        </Flex>
      </Flex>
    )
  return <></>
}

export default DocumentDetail

let detailsBox = {
  width: '520px',
  flexDirection: 'column',
  rowGap: '1rem',
  height: '768px',
  marginRight: '2rem',
  transition: 'width 0.5s',
}

let abstractBox = {
  borderRadius: '6px',
  backgroundColor: 'background.white',
  width: 'inherit',
  padding: '16px 32px',
}

let descriptionBox = {
  ...abstractBox,
  flexDirection: 'column',
  rowGap: '8px',
  height: 'fit-content',
}

let markdownBox = {
  maxHeight: '400px',
  overflowY: 'scroll',
  overflowWrap: 'break-word',
  whiteSpaec: 'initial',
  wordWrap: 'break-word',
  textOverflow: 'ellipsis',
}

let noteBox = {
  ...abstractBox,
  width: 'inherit',
  height: 'fit-content',
  maxHeight: '200px',
  overflow: 'auto',
}

let titleText = {
  fontSize: '20px',
  fontWeight: 'semibold',
}

let newDocumentBtn = {
  width: '232px',
}

let editDocumentBtn = {
  width: '232px',
}
