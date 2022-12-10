import {
  Badge,
  Box,
  Flex,
  SimpleGrid,
  HStack,
  Image,
  Text,
  Editable,
  EditablePreview,
  EditableTextarea,
  GridItem,
  Center,
} from '@chakra-ui/react'
import { getDate } from 'date-fns'

type propsType = {
  type: 'generatedFolder' | 'generatedFile' | 'uploadedFile' | 'sharedFile'
  id: string
  title: string
  amount?: number
  size?: number
  author?: string
  image?: string
  showMenu?: boolean
  showNote?: boolean
  menu?: JSX.Element
  colorBar?: string
  createdDate?: Date
  showDate?: boolean
  url?: string
}

const TableListItem = ({
  type,
  id,
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
  url,
}: propsType) => {
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
    <Box sx={boxLayout} alignItems="center" padding="20px">
      <SimpleGrid columns={10} alignItems="center" width="100%">
        <GridItem colSpan={3}>
          <HStack spacing="10px">
            <Image src={getImageUrl()} sx={documentImage} />
            <Flex direction="column">
              <Text sx={titleText}>{title}</Text>
              <Text sx={subText}>{getSubText()} </Text>
            </Flex>
          </HStack>
        </GridItem>
        <GridItem colSpan={3}>
          <Center>
            <Badge
              colorScheme="blue"
              fontSize="16px"
              textAlign="center"
              margin="auto"
            >
              {Date()}
            </Badge>
          </Center>
        </GridItem>

        <GridItem colSpan={3}>
          <Center>
            {showNote && (
              <Box>
                <Editable
                  defaultValue="note"
                  fontSize="14px"
                  color="accent.gray"
                >
                  <EditablePreview />
                  <EditableTextarea _focusVisible={{ boxShadow: 'none' }} />
                </Editable>
              </Box>
            )}
          </Center>
        </GridItem>
        <GridItem colSpan={1}>
          <Box position="relative">{menu}</Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

export default TableListItem

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

let boxLayout = {
  width: '95%',
  height: '100px',
  backgroundColor: 'accent.white',
  borderColor: 'accent.gray',
  borderRadius: '8px',
  boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.1)',
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
