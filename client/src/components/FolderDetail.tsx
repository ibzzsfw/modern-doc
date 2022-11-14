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
import { AiOutlineDoubleRight } from 'react-icons/ai'
import Status from '@models/DocumentStatus'
import Markdown from 'marked-react';
import { useGeneratedFileStore } from '@stores/GeneratedFile'
import GeneratedFile from '@models/GeneratedFile'
import Field from '@models/Field'
import { useNavigate } from 'react-router-dom'

type propsType = {
  title: string
  status: Status
  description: string
  markdown: string
}

const FolderDetail = ({ title, status, description, markdown }: propsType) => {

  const navigate = useNavigate()
  const { generatedFile, setGeneratedFileField } = useGeneratedFileStore()

  const generateForm = () => {
    let fieldsUnique: Field[] = []
    generatedFile
      .filter((file) => file instanceof GeneratedFile)
      .map((file) => fieldsUnique = [...fieldsUnique, ...file.field])
    // unique by field id
    fieldsUnique = fieldsUnique.filter((field, index, self) =>
      index === self.findIndex((t) => (
        t.id === field.id
      ))
    )
    setGeneratedFileField(fieldsUnique)
    navigate('/form')
  }

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
          <Button
            size="sm"
            borderColor="accent.blue"
            variant="outline"
            rightIcon={<AiOutlineDoubleRight />}
          >
            อ่านเพิ่มเติม
          </Button>
        </Box>
      </Flex>
      <Box sx={noteBox}>{description}</Box>
      <Spacer />
      <ButtonGroup gap="24px" marginTop="24px" isDisabled={generatedFile.length == 0}>
        <Button sx={newDocumentBtn} colorScheme='green' onClick={generateForm}>สร้างเอกสารใหม่</Button>
        <Button sx={editDocumentBtn} colorScheme='gray' variant='outline'>แก้ไขเอกสารเดิม</Button>
      </ButtonGroup>
    </Flex>
  )
}

let detailsBox = {
  width: '520px',
  flexDirection: 'column',
  rowGap: '1rem',
  height: '768px',
  marginRight: '2rem',
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
  whiteSpace: 'nowrap',
  overflow: 'hidden',
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
  // backgroundColor: 'accent.green',
  // color: 'accent.white',
  // _hover: {
  //   backgroundColor: 'accent.green',
  //   color: 'accent.white',
  // },
  // _active: {
  //   backgroundColor: 'accent.green',
  //   color: 'accent.white',
  // },
}

let editDocumentBtn = {
  width: '232px',
  // backgroundColor: 'accent.white',
  // color: 'accent.black',
  // border: '1px solid',
  // borderColor: 'accent.blue',
  // _hover: {
  //   backgroundColor: 'accent.white',
  //   color: 'accent.black',
  // },
  // _active: {
  //   backgroundColor: 'accent.white',
  //   color: 'accent.black',
  // },
}

export default FolderDetail
