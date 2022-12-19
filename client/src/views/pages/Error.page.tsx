import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

/**
 * 
 * When the user tries to access a page that does not exist, this page is displayed.
 * Or when the user tries to access a page that requires authentication and is not logged in.
 * 
 */
const Error = () => {

  return (
    <VStack>
      <Heading>404</Heading>
      <Text>Page not found</Text>
      <Link to="/home">
        <Button sx={backButton}>
          Go back to home
        </Button>
      </Link>
    </VStack>
  )
}

let backButton = {
  backgroundColor: 'accent.blue',
  color: 'white',
  marginTop: '16px',
  _active: { backgroundColor: 'hover.blue', color: 'white' },
  _hover: { backgroundColor: 'hover.blue', color: 'white' }
}

export default Error
