import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react'
import Markdown from 'marked-react'
import { useNavigate } from 'react-router-dom'
import shallow from 'zustand/shallow'
import { useState } from 'react'
import GeneratedDocumentBadge from '@components/DocumentBadge.component'
import UploadFile from '@components/UploadFile.component'
import ConfirmationModal from '@components/ConfirmationModal.component'
import TakeNote from '@components/TakeNote.component'
import Status from '@view-models/DocumentStatus'
import FilePageModel from '../../mvvm/models/FilePage.model'
import FormPageModel from '../../mvvm/models/FormPage.model'
import FieldViewModel from '../../mvvm/view-models/Field.viewmodel'

type propsType = {
  title: string
  status: Status
  description: string | undefined | null
  markdown: string
  type?: 'generatedFile' | 'uploadedFile' | 'freeUploadFile' | 'folder' | string
  note?: string
}

const FolderDetail = ({
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

  const { file, field } = FilePageModel((state) => {
    return {
      file: state.file,
      field: state.field,
    }
  }, shallow)

  const {
    documentType,
    document,
    selectedFile,
    generatedFile,
    setField,
    setDocument,
    setGeneratedFile,
  } = FormPageModel((state) => {
    return {
      setField: state.setField,
      document: state.document,
      selectedFile: state.selectedFile,
      generatedFile: state.generatedFile,
      setDocument: state.setDocument,
      documentType: state.documentType,
      setGeneratedFile: state.setGeneratedFile,
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
        {type === 'generatedFile' ? (
          <ButtonGroup
            gap="24px"
            marginTop="24px"
            isDisabled={field.length === 0}
          >
            <Button
              sx={newDocumentBtn}
              colorScheme="green"
              onClick={() => {
                setField(
                  field.map((field: FieldViewModel) => {
                    if (keepField.includes(field.name) === false) {
                      field.userValue = ''
                    }
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
              colorScheme="gray"
              variant="outline"
              onClick={() => {
                setField(field)
                setDocument(file)
                navigate('/form')
              }}
            >
              แก้ไขเอกสารเดิม
            </Button>
            <TakeNote
              doucmentType={documentType}
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
          </ButtonGroup>
        ) : null}
        {type === 'folder' ? (
          <>
            <ButtonGroup
              gap="24px"
              marginTop="24px"
              isDisabled={selectedFile.length == 0}
            >
              <Button
                sx={newDocumentBtn}
                colorScheme="green"
                onClick={() => {
                  let temp = generatedFile.map((document) => {
                    document.fields.map((field) => {
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
            </ButtonGroup>
            <TakeNote
              doucmentType={documentType}
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
          </>
        ) : null}
        <Flex justifyContent="flex-start">
          {status === 'ไม่มีอยู่ในคลัง' && (
            <UploadFile
              customButton={<Button colorScheme="green">อัปโหลดไฟล์</Button>}
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

export default FolderDetail

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