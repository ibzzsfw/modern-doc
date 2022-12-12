import { Box, Center, HStack } from '@chakra-ui/react'
import ProfileFormInput from '@components/ProfileFormInput'
import ProfilePicture from '@components/ProfilePicture'
import { useLoginDataStore } from '@stores/LoginDataStore'
import { useFamilyDataStore } from '@stores/FamilyDataStore'
import { useProfiledataStore } from '@stores/MyProfiledataStore'
const MyProfile = () => {
  const user = useLoginDataStore.getState().user
  const { setUser } = useProfiledataStore()
  console.log(user)
  
  return (
    <Box sx={myprofileLayout}>
      <Center>
        <HStack gap="138px">
          <ProfilePicture url={user?.profileURI} />
          <ProfileFormInput
            data={{
              ...user,
              birthDate: new Date(user!.birthDate).toISOString().split('T')[0],
            }}
          />
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
