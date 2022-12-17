import { Box, Flex, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
// import { SearchBoxModel } from '@models/SearchBoxStore.model'
import SearchModel from '../../mvvm/models/Search.model'

type propsType = {
  title: string
  image: string
}

const PopularBox = ({ title, image }: propsType) => {
  const navigate = useNavigate()
  const { setSearch, setSearchResult } = SearchModel()

  const onSelectTag = (title: string) => {
    setSearch(title)
    let result: any | any[] = []
    setSearchResult(result)
    navigate(`/search/`)
  }

  let imageBox = {
    width: '100%',
    height: '145px',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    borderRadius: '8px 8px 0px 0px',
  }

  return (
    <Flex sx={layout} gap="0px" onClick={() => onSelectTag(title)}>
      <Box sx={imageBox} />
      <Box sx={titleBox}>
        <Text as="b">{title}</Text>
      </Box>
    </Flex>
  )
}

export default PopularBox

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
  },
}

let titleBox = {
  width: '100%',
  border: '1px solid #E2E8F0',
  borderRadius: '8px',
  textAlign: 'center',
  padding: '8px 0px',
}