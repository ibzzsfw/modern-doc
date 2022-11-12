import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSearchDocumentStore } from '@stores/SearchDocument'

type propsType = {
  title: string
  image: string
}

const PopularBox = ({ title, image }: propsType) => {

  const navigate = useNavigate()
  const { search, setSearch, setSearchResult, setSearchResultAmount } = useSearchDocumentStore()

  let layout = {
    width: '196px',
    boxShadow: '0px 5px 5px 1px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    flexDirection: 'column',
    _hover: {
      cursor: 'pointer',
      boxShadow: '0px 10px 10px 2px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)',
      transition: 'all 0.2s ease-in-out',
    }
  }

  let imageBox = {
    width: '100%',
    height: '145px',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    borderRadius: '8px 8px 0px 0px',
  }

  let titleBox = {
    width: '100%',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    textAlign: 'center',
    padding: '8px 0px'
  }

  const onSelectTag = (title: string) => {
    setSearch(title)
    let result: any | any[] = [] // API call search(title)
    setSearchResult(result)
    setSearchResultAmount(result.length)
    navigate(`/search`)
  }

  return (
    <Flex sx={layout} gap='0px' onClick={() => onSelectTag(title)}>
      <Box sx={imageBox} />
      <Box sx={titleBox}>
        <Text as='b'>{title}</Text>
      </Box>
    </Flex>
  )
}

export default PopularBox
