import { Box, Center, HStack } from '@chakra-ui/react'
import ProfileFormInput from '@components/ProfileFormInput'
import ProfilePicture from '@components/ProfilePicture'
import { useLoginDataStore } from '@stores/LoginDataStore'

const MyProfile = () => {
  const profile = useLoginDataStore((state) => state.user)

  console.log(profile)

  return (
    <Box sx={myprofileLayout}>
      <Center>
        <HStack gap="138px">
          <ProfilePicture url={profile?.profileURI} />
          <ProfileFormInput data={profile} />
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
