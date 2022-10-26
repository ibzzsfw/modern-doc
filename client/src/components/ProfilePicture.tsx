import { Avatar, Box,Image ,Text,Center, VStack} from "@chakra-ui/react"
import {HiUser} from 'react-icons/hi'



const ProfilePicture = () => {
    let profilePictureLayout = {
        width: '365px',
        height: '365px',
       
           
    }

    return(
        <VStack gap='34px'>
        <Image src="https://bit.ly/sage-adebayo" 
        sx={profilePictureLayout}
        borderRadius = '8px' />
        <Text size='14px' >อัปโหลดรูปขนาดไม่เกิน 5 MB</Text>
    
        </VStack>
        )
}


export default ProfilePicture