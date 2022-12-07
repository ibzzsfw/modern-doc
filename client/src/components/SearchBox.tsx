import { HStack, Icon, IconButton, Input } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
type propsType = {
  page?: string
  value?: string
  onSearchClick?: (params: string) => void
}

const SearchBox = ({ value, page, onSearchClick }: propsType) => {
  const [searchValue, setSearchValue] = useState(value || '')

  return (
    <HStack>
      <Input
        data-testid="input-search"
        placeholder="ค้นหา"
        sx={searchBox}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <IconButton
        data-testid="search-button"
        aria-label="ค้นหา"
        icon={<Icon as={FiSearch} color="accent.white" boxSize="20px" />}
        sx={searchButton}
        onClick={() => {
          onSearchClick && onSearchClick(searchValue)
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
    backgroundColor: 'hover.darkblue',
  },
  _active: {
    backgroundColor: 'hover.white',
  },
}

export default SearchBox
