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
import GeneratedDocumentBadge from '@components/DocumentBadge'
import Status from '@models/DocumentStatus'
import { useFilePageStore } from '@stores/FilePageStore'
import { useFormPageStore } from '@stores/FormPageStore'
import Markdown from 'marked-react'
import { useNavigate } from 'react-router-dom'
import shallow from 'zustand/shallow'
import TakeNote from '@components/TakeNote'
import ConfirmationModal from '@components/ConfirmationModal'
import { useState } from 'react'
import UploadFile from '@components/UploadFile'

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

  const { file, setFile } = useFilePageStore((state) => {
    return {
      file: state.file,
      setFile: state.setFile,
    }
  }, shallow)

  const {
    setField,
    document,
    setDocument,
    setType,
    generatedFiles,
    setGeneratedFiles,
    selectedDocument,
  } = useFormPageStore((state) => {
    return {
      setField: state.setField,
      document: state.document,
      setDocument: state.setDocument,
      setType: state.setType,
      generatedFiles: state.generatedFiles,
      setGeneratedFiles: state.setGeneratedFiles,
      selectedDocument: state.selectedDocument,
    }
  }, shallow)

  // const generateForm = () => {
  //   let fieldsUnique: Field[] = []
  //   generatedFile
  //     .filter((file) => file instanceof GeneratedFile)
  //     .map((file) => (fieldsUnique = [...fieldsUnique, ...file.field]))
  //   // unique by field id
  //   fieldsUnique = fieldsUnique.filter(
  //     (field, index, self) => index === self.findIndex((t) => t.id === field.id)
  //   )
  //   setGeneratedFileField(fieldsUnique)
  //   navigate('/form')
  // }

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

  const keepField = [
    'firstname_personal',
    'lastname_personal',
    'sex_personal',
    'birthdate_personal',
    'citizenId_personal',
    'email_personal',
    'title_personal',
  ]

  console.log('file', document)

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
          <Box textAlign="end">
            {/* <Button
            size="sm"
            borderColor="accent.blue"
            variant="outline"
            rightIcon={!isExpand ? <AiOutlineDoubleRight /> : undefined}
            leftIcon={isExpand ? <AiOutlineDoubleLeft /> : undefined}
            onClick={() => setIsExpand(!isExpand)}
          ></Button> */}
          </Box>
        </Flex>

        <Box sx={noteBox}>
          <Heading sx={titleText}>บันทึกเตือนความจำ</Heading>
          {description}
        </Box>
        {type === 'generatedFile' ? (<>
          <ButtonGroup
            gap="24px"
            marginTop="24px"
            isDisabled={file.fields.length === 0}
          >
            <Button
              sx={newDocumentBtn}
              colorScheme="green"
              onClick={() => {
                setField(
                  file.fields.map((field) => {
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
            
          </ButtonGroup>
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
       </> ) : null}
        {type === 'folder' ? (
          <>
            <ButtonGroup
              gap="24px"
              marginTop="24px"
              isDisabled={selectedDocument.length == 0}
            >
              <Button
                sx={newDocumentBtn}
                colorScheme="green"
                onClick={() => {
                  let temp = generatedFiles.map((document) => {
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
                        <Text as="b"> {selectedDocument.length} </Text>{' '}
                        รายการหรือไม่
                      </Text>
                    ),
                  })
                  setGeneratedFiles(temp)

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
                        <Text as="b"> {selectedDocument.length} </Text>{' '}
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
        <Flex justifyContent="flex-start">
          {file.type === 'uploadedFile' && (
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
            documentItem={selectedDocument}
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
