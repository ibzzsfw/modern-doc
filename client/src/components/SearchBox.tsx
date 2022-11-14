import { HStack, Icon, IconButton, Input } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


const SearchBox = () => {
  const nevigete = useNavigate()
  const [keyword,setKeyword] = useState('')




  return (
    <HStack>
      <Input
        placeholder="ค้นหา"
        sx={searchBox}
        onChange={(e) => {setKeyword(e.target.value) }}
      />
      <IconButton
        aria-label="ค้นหา"
        icon={<Icon as={FiSearch} color="accent.white" boxSize="20px" />}
        sx={searchButton} 
        onClick={() => {
          keyword !== '' ? nevigete(`/search/${keyword}`) : ''
        }}
      />
    </HStack>
  )
}

let searchBox = {
  boxShadow: '0px 5px 10px 2px rgba(0, 0, 0, 0.1)',
  border: '1px solid accent.lightGray',
  backgroundColor: 'background.white',
}

let searchButton = {
  backgroundColor: 'accent.blue',
  _hover: {
    backgroundColor: 'hover.blue',
  },
  _active: {
    backgroundColor: 'hover.blue',
  },
}

export default SearchBox
