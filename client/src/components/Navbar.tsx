import { Avatar, Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import NavbarAvatar from '@components/NavbarAvatar'

const Navbar = () => {
  let layout = {
    width: '100vw',
    position: 'fixed',
    top: '0px',
    boxShadow:
      '0px 10px 10px 2px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    zIndex: '1',
    marginBottom: '20px',
    backgroundColor: 'background.gray',
  }

  let navFlex = {
    width: '100%',
    margin: 'auto',
    padding: '0',
    height: '76px',
    alignItems: 'center',
    backgroundColor: 'background.gray',
    maxWidth: '1280px',
    justifyContent: 'space-between',
  }

  return (
    <Box sx={layout}>
      <Flex sx={navFlex}>
        <Image src="/assets/ModernDoc.png" height="54px" />
        <HStack gap="24px">
          <Link to="/home">
            <Text>หน้าหลัก</Text>
          </Link>
          <Link to="/mydocument">
            <Text>แฟ้ม</Text>
          </Link>
        </HStack>
        <NavbarAvatar />
      </Flex>
    </Box>
  )
}

export default Navbar
