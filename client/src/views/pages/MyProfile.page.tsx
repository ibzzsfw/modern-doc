import { Box, Center, HStack } from '@chakra-ui/react'
import ProfileFormInput from 'src/views/components/ProfileFormInput.component'
import ProfilePicture from 'src/views/components/ProfilePicture.component'
import MyProfileViewController from '../view-controllers/MyProfile.page.viewcontroller'

const MyProfile = () => {
  const viewController = new MyProfileViewController()

  const user = viewController.getUser()

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
