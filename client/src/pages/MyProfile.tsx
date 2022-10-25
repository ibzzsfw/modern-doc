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
  } from '@chakra-ui/react'
  import { FiEdit } from 'react-icons/fi'
  import ProfilePicture from '@/components/ProfilePicture'
 import ProfileFormInput from '@/components/ProfileFormInput'
  
const MyProfile = () => {

    let myprofileLayout = {
        backgroundColor: 'background.gray',
        color: 'accent.black',
        width: '100%',
        height: '100%',
    }
    let editButton = {
        width: 'auto',
        height: '40px',
        backgroundColor: 'accent.white',
        color: 'black',
        margin: 'auto',
        variant : 'outline',
        border: '1px solid',
        borderColor: '#E2E8F0',
        left: '460px',
        
        _hover: {
          backgroundColor: 'hover.gray',
          color: 'white',
        },
        _active: {
          backgroundColor: 'hover.white',
        },
      }


    return (
        <Box sx={myprofileLayout}>
            <VStack >
            <Button sx={editButton}
            leftIcon={<FiEdit/>}>
                    แก้ไขข้อมูลส่วนตัว</Button>
                <HStack alignItems='start' gap= '138px'>
                     <ProfilePicture/>
                     <ProfileFormInput/>
                    </HStack>
            </VStack>
               
                
                
        </Box>
    )
}
export default MyProfile