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
  } from '@chakra-ui/react'
  import { FiEdit } from 'react-icons/fi'
  import ProfilePicture from '@/components/ProfilePicture'
 import ProfileFormInput from '@/components/ProfileFormInput'
  
const MyProfile = () => {

    let myprofileLayout = {
        backgroundColor: 'background.gray',
        color: 'accent.black',
        width: '100%'
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
            <Button sx={editButton} gap='8px'>
                <Icon as={FiEdit}/>
                แก้ไขข้อมูลส่วนตัว</Button>
                <ProfilePicture/>
              
                
        </Box>
    )
}
export default MyProfile