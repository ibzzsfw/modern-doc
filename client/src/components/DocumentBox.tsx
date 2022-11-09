import {
  Box,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

type propsType = {
  type: 'generatedFolder' | 'generatedFile' | 'uploadedFile' | 'sharedFile'
  title: string
  amount?: number
  size?: number
  author?: string
  image?: string
  showMenu?: boolean
  showNote?: boolean
  menu?: any
  colorBar?: string
  createdDate?: Date
  showDate?: boolean
}

const DocumentBox = ({
  type,
  title,
  amount,
  size,
  author,
  image,
  showNote,
  menu,
  colorBar,
  createdDate,
  showDate,
}: propsType) => {
  let layout = {
    width: '320px',
    boxShadow:
      '10px 10px 7px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderRadius: '16px',
    backgroundColor: 'background.white',
    position: 'relative',
    padding: '20px 20px 20px 40px',
    cursor: 'pointer',
    transition: 'all 0.1s ease-in-out',
    _hover: {
      backgroundColor: 'background.gray',
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
  }

  const getSubText = () => {
    if (showDate) {
      if (createdDate) {
        return `สร้างเมื่อ ${createdDate.toLocaleDateString('en-GB')}`
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
  }

  return (
    <Link to='/folder'>
    <Box sx={layout}>
      {colorBar && <Box sx={colorBarStyle}></Box>}
      <Flex gap="30px" alignItems="center">
        {menu}
        <Image src={getImageUrl()} sx={documentImage} />
        <Flex flexDirection="column">
          <Text sx={titleText}>{title}</Text>
          <Text sx={subText}>{getSubText()}</Text>
        </Flex>
      </Flex>
      {showNote && (
        <Box marginTop="18px">
          <Editable
            defaultValue="note"
            height="80px"
            border="2px solid"
            borderColor="#E2E8F0"
            borderRadius="8px"
            padding="4px 12px"
            fontSize="14px"
            color="accent.gray"
          >
            <EditablePreview />
            <EditableTextarea _focusVisible={{ boxShadow: 'none' }} />
          </Editable>
        </Box>
      )}
    </Box>
    </Link>

  )
}

export default DocumentBox
