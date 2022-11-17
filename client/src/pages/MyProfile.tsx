import { Box, Center, HStack } from '@chakra-ui/react'
import ProfileFormInput from '@components/ProfileFormInput'
import ProfilePicture from '@components/ProfilePicture'
import { useState, useEffect } from 'react'
import User from '@models/User'
import Axios from 'axios'

const MyProfile = () => {
  var personal_info: User

  useEffect(() => {
    console.log('getProfile')
    //get personal info from api
   
    /*Axios.get<User>('api/user').then(res=>{
      personal_info = res.data
      console.log(personal_info)
    })*/
  })

  return (
    <Box sx={myprofileLayout}>
      <Center>
        <HStack gap="138px">
          <ProfilePicture url={personal_info.profileURI} />
          <ProfileFormInput />
        </HStack>
      </Center>
    </Box>
  )
}

let myprofileLayout = {
  backgroundColor: 'background.white',
  color: 'accent.black',
  padding: '50px 20px 40px 20px',
  borderRadius: '8px',
  boxShadow:
    '10px 10px 7px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
}

export default MyProfile
