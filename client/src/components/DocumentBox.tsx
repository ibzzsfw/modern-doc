import {
  Box,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Image,
  Text,
  Button,
  useEditableControls,
  Input,
  EditableInput,
  useEditableState,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

type propsType = {
  type:
    | 'generatedFolder'
    | 'generatedFile'
    | 'uploadedFile'
    | 'sharedFile'
    | 'note'
  id: string
  title: string
  amount?: number
  size?: number
  author?: string
  image?: string
  showMenu?: boolean
  showNote?: boolean
  note?: string
  menu?: any
  colorBar?: string
  createdDate?: Date
  modifiedDate?: Date
  showDate?: boolean
  url?: string
}

const DocumentBox = ({
  type,
  id,
  title,
  amount,
  size,
  author,
  image,
  showNote,
  note,
  menu,
  colorBar,
  modifiedDate,
  createdDate,
  showDate,
  url,
}: propsType) => {
  
  let layout = {
    width: '320px',
    boxShadow: '5px 5px 3px -2px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    backgroundColor: 'background.white',
    position: 'relative',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.1s ease-in-out',
    _hover: {
      cursor: 'pointer',
      boxShadow: '10px 10px 7px -5px rgba(0, 0, 0, 0.2)',
      transform: 'translate(-2px, -2px)',
    },
  }

  let documentImage = {
    width: '60px',
  }

  let titleText = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'accent.black',
  }

  let subText = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'accent.gray',
  }

  let colorBarStyle = {
    width: '18px',
    height: '100%',
    position: 'absolute',
    right: '0px',
    top: '0px',
    borderRadius: '0px 8px 8px 0px',
    backgroundColor: colorBar,
  }

  const getImageUrl = () => {
    if (image) {
      return image
    }
    if (type === 'generatedFolder') {
      return '/assets/folder_logo.png'
    }
    if (type === 'generatedFile') {
      return '/assets/file_logo.png'
    }
    if (type === 'uploadedFile') {
      return '/assets/card_logo.png'
    }
    if (type === 'sharedFile') {
      return '/assets/shared_logo.png'
    }
    if (type === 'note') {
      return '/assets/note_logo.png'
    }
    
  }

  const getSubText = () => {
    if (showDate) {
      if (createdDate) {
        return `สร้างเมื่อ ${new Date(createdDate).toLocaleDateString('en-GB')}`
      }
      return 'ยังไม่ได้สร้าง'
    }
    if (type === 'generatedFolder') {
      return `${amount} เอกสาร`
    }
    if (type === 'generatedFile') {
      return `${size} MB`
    }
    if (type === 'uploadedFile') {
      return `${size} MB`
    }
    if (type === 'sharedFile') {
      return `ผู้สร้าง : ${author}`
    }
    if (type === 'note') {
      return `แก้ไขล่าสุดเมื่อ : ${new Date(modifiedDate).toLocaleDateString('en-GB')}`
    }
  }

  const getUrl = (): string => {
    if (type === 'generatedFolder') {
      return `/folder/${id}`
    }
    if (type === 'generatedFile') {
      return `/file/1/${id}`
    }
    if (type === 'uploadedFile') {
      return `/file/2/${id}`
    }
    if (type === 'sharedFile') {
      return `/file/3/${id}`
    }
    return ''
  }

  return (
    <Box sx={layout}>
      {colorBar && <Box sx={colorBarStyle}></Box>}
      <Flex gap="30px" alignItems="center">
        {menu}
        <Link to={getUrl()}>
          <Image src={getImageUrl()} sx={documentImage} />
        </Link>
        <Flex flexDirection="column">
          <Link to={getUrl()}>
            <Text sx={titleText}>{title}</Text>
            <Text sx={subText}>{getSubText()}</Text>
          </Link>
        </Flex>
      </Flex>

      {showNote && (
        <Box marginTop="18px">
          <Editable
            defaultValue={note}
            height="80px"
            border="2px solid"
            borderColor="#E2E8F0"
            borderRadius="8px"
            padding="4px 12px"
            fontSize="14px"
            color="accent.gray"
            overflow="hidden"
          >
            <EditablePreview />
            <EditableTextarea _focusVisible={{ boxShadow: 'none' }} />
            
          </Editable>
        </Box>
      )}
    </Box>
  )
}

export default DocumentBox
