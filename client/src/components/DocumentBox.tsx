import {
  Avatar,
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { GrDocumentText, GrDownload } from 'react-icons/gr'
import { AiFillPrinter, AiOutlineEdit } from 'react-icons/ai'

import MenuProvider from '@components/MenuProvider'

type propsType = {
  type: 'generatedFolder' | 'generatedFile' | 'uploadedFile' | 'sharedFile'
  title: string
  amount?: number
  size?: number
  author?: string
  image?: string
}

const DocumentBox = ({
  type,
  title,
  amount,
  size,
  author,
  image,
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

  let threeDot = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    color: 'accent.black',
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
    <Box sx={layout}>
      <Flex gap="30px" alignItems="center">
        <MenuProvider
          left="108px"
          top="36px"
          menusList={[
            [
              {
                title: 'รายละเอียด',
                icon: <Icon as={GrDocumentText} />,
                onClick: () => {},
              },
              {
                title: 'แก้ไขโน้ต',
                icon: <Icon as={AiOutlineEdit} />,
                onClick: () => {},
              },
              {
                title: 'ดาวน์โหลด',
                icon: <Icon as={GrDownload} />,
                onClick: () => {},
              },
              {
                title: 'พิมพ์',
                icon: <Icon as={AiFillPrinter}/>,
                onClick: () => {},
              },
            ],
            [
              {
                title: 'ลบแฟ้ม',
                icon: <Icon as={BsTrash} color="accent.red" />,
                onClick: () => {},
                style: {
                  color: 'accent.red',
                },
              },
            ],
          ]}
        >
          <Icon as={BsThreeDots} sx={threeDot} boxSize="18px" />
        </MenuProvider>
        <Image src={getImageUrl()} sx={documentImage} />
        <Flex flexDirection="column">
          <Text sx={titleText}>{title}</Text>
          <Text sx={subText}>{getSubText()}</Text>
        </Flex>
      </Flex>
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
    </Box>
  )
}

export default DocumentBox
