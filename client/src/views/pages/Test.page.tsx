import { VStack, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Error = () => {

  return (
    <VStack>
      <Heading>404</Heading>
      <Text>Page not found</Text>
      <Link to="/home">
        <Button
          backgroundColor="accent.blue"
          color="white"
          marginTop="16px"
          _active={{ backgroundColor: 'hover.blue', color: 'white' }}
          _hover={{ backgroundColor: 'hover.blue', color: 'white' }}
        >
          Go back to home
        </Button>
      </Link>
    </VStack>
  )
}

export default Error
