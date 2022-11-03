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

type propsType = {
  title: string
  status: Status
  description: string
  markdown: string
}

const FolderDetail = ({ title, status, description, markdown }: propsType) => {
  let detailsBox = {
    width: '520px',
    flexDirection: 'column',
    rowGap: '1rem',
    maxHeight: 'inherit',
  }

  let abstractBox = {
    borderRadius: '6px',
    backgroundColor: 'background.white',
    width: 'inherit',
    height: 'fit-content',
  }

  let descriptionBox = {
    ...abstractBox,
    flexDirection: 'column',
    rowGap: '8px',
    padding: '16px 32px',
  }

  let titleText = {
    fontSize: '20px',
    fontWeight: 'semibold',
  }

  let newDocumentBtn = {
    width: '232px',
    backgroundColor: 'accent.green',
    color: 'accent.white',
    _hover: {
      backgroundColor: 'accent.green',
      color: 'accent.white',
    },
    _active: {
      backgroundColor: 'accent.green',
      color: 'accent.white',
    },
  }

  let editDocumentBtn = {
    width: '232px',
    backgroundColor: 'accent.white',
    color: 'accent.black',
    border: '1px solid',
    borderColor: 'accent.blue',
    _hover: {
      backgroundColor: 'accent.white',
      color: 'accent.black',
    },
    _active: {
      backgroundColor: 'accent.white',
      color: 'accent.black',
    },
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
        <Markdown value={markdown} />
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
      <Box sx={descriptionBox}>{description}</Box>
      <ButtonGroup gap="24px" marginTop="24px">
        <Button sx={newDocumentBtn}>สร้างเอกสารใหม่</Button>
        <Button sx={editDocumentBtn}>แก้ไขเอกสารเดิม</Button>
      </ButtonGroup>
    </Flex>
  )
}

export default FolderDetail
