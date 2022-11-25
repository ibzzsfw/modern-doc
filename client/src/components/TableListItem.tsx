import {Box,Text} from '@chakra-ui/react'


type propsTypes = {
    type: 'generatedFolder' | 'generatedFile' | 'uploadedFile' | 'sharedFile'
  id: string
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
  url?: string
}


const TableListItem = () => {
    return (
        <Box>
            <Text>item content</Text>
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