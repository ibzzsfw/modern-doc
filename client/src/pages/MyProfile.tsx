import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Input,
  IconButton,
  Icon,
  background,
  Button,
  border,
  Center,
} from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import ProfilePicture from '@components/ProfilePicture'
import ProfileFormInput from '@components/ProfileFormInput'

const MyProfile = () => {
  const data = {}
  let myprofileLayout = {
    backgroundColor: 'background.white',
    color: 'accent.black',
    padding: '50px 20px 40px 20px',
    borderRadius: '8px',
    boxShadow:
      '10px 10px 7px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
  }

  return (
    <Box sx={myprofileLayout}>
      <Center>
        <HStack gap="138px">
          <ProfilePicture />
          <ProfileFormInput />
        </HStack>
      </Center>
    </Box>
  )
}
export default MyProfile
