import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Spacer,
} from '@chakra-ui/react'
import GeneratedDocumentBadge from '@components/DocumentBadge'
import Status from '@models/DocumentStatus'
import { useFilePageStore } from '@stores/FilePageStore'
import { useFormPageStore } from '@stores/FormPageStore'
import Markdown from 'marked-react'
import { useNavigate } from 'react-router-dom'
import shallow from 'zustand/shallow'

type propsType = {
  title: string
  status: Status
  description: string
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

  const { file, setFile } = useFilePageStore((state) => {
    return {
      file: state.file,
      setFile: state.setFile,
    }
  }, shallow)

  const { setField, setDocument, setType } = useFormPageStore((state) => {
    return {
      setField: state.setField,
      setDocument: state.setDocument,
      setType: state.setType,
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
      <Box sx={noteBox}>{file.note}</Box>
      {type === 'generatedFile' ? (
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
      ) : null}
      {type === 'folder' ? (
        <ButtonGroup gap="24px" marginTop="24px" isDisabled={true}>
          <Button sx={newDocumentBtn} colorScheme="green" onClick={() => {}}>
            สร้างเอกสารใหม่
          </Button>
          <Button sx={editDocumentBtn} colorScheme="gray" variant="outline">
            แก้ไขเอกสารเดิม
          </Button>
        </ButtonGroup>
      ) : null}
    </Flex>
  )
}

export default FolderDetail
