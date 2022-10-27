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
import ProfilePicture from '@/components/ProfilePicture'
import ProfileFormInput from '@/components/ProfileFormInput'
import OTPVerify from '@/components/OTPVerify'

const MyProfile = () => {
  let myprofileLayout = {
    backgroundColor: 'background.white',
    color: 'accent.black',
    width: '1417px',
    height: '1004px',
    
  }
  

  return (
    
      
        
        <HStack  gap="138px">
          <ProfilePicture />
          <ProfileFormInput />
          <OTPVerify />
        </HStack>
      

        
        
       
    
  )
}
export default MyProfile
