import { HStack, Icon, IconButton, Input } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

type propsType = {
  onClick?: () => void
  setValue?: (value: string) => void
}

const SearchBox = ({ onClick, setValue }: propsType) => {
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

  return (
    <HStack>
      <Input
        placeholder="ค้นหา"
        sx={searchBox}
        onChange={(e) => (setValue ? setValue(e.target.value) : null)}
      />
      <IconButton
        aria-label="ค้นหา"
        icon={<Icon as={FiSearch} color="accent.white" boxSize="20px" />}
        sx={searchButton}
        onClick={onClick}
      />
    </HStack>
  )
}

export default SearchBox
