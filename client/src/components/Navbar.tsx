import { Avatar, Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  let layout = {
    width: '100%',
    margin: 'auto',
    position: 'fixed',
    top: '0px',
    boxShadow:
      '0px 10px 10px 2px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    zIndex: '10000',
    marginBottom: '20px',
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
          <Link to="/">
            <Text>หน้าหลัก</Text>
          </Link>
          <Link to="/folder">
            <Text>แฟ้ม</Text>
          </Link>
        </HStack>

        <Avatar width="48px" />
      </Flex>
    </Box>
  )
}

export default Navbar
