import {
  Box,
  Icon,
  Image,
  Input,
  Text,
  VStack
} from '@chakra-ui/react'
import { uploadFile } from '@firebase'
import { MyProfilePageModel } from '@models/MyProfilePage.state.model'
import UserModel from '@models/User.model'
import { useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'

type propTypes = {
  url: string | undefined
}

const ProfilePicture = ({ url }: propTypes) => {
  const { isEdit } = MyProfilePageModel()
  const { user } = UserModel()


  const [image, setImage] = useState<any>(null)

  return (
    <VStack gap="34px">
      <Box sx={uploadImagelayout}>
        <VStack>
          <Image
            src={
              image != null
                ? URL.createObjectURL(image)
                : url ?? 'https://via.placeholder.com/365x365'
            }
            boxSize="365px"
            borderRadius="8px"
            position="absolute"
          ></Image>

          <Box
            width="365px"
            height="365px"
            borderRadius="8px"
            sx={isEdit ? backgroundHover : { opacity: 0 }}
          >
            <Input
              type="file"
              position="absolute"
              height="100%"
              opacity="0"
              aria-hidden="true"
              display={isEdit ? 'block' : 'none'}
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files![0])
                uploadFile('images/', e.target.files![0]).then((url) => {
                  if (user) {
                    user.profileURI = url
                  }
                })
              }}
            />
            <Icon
              as={AiOutlineUpload}
              top="157.5px"
              left="157.5px"
              position="absolute"
              boxSize="60px"
              color="white"
              aria-hidden="true"
            />
          </Box>
          <Text size="14px">อัปโหลดรูปขนาดไม่เกิน 5 MB</Text>
        </VStack>
      </Box>
    </VStack>
  )
}

export default ProfilePicture

let uploadImagelayout = {
  width: '365px',
  height: '365px',
  position: 'relative',
}

let backgroundHover = {
  opacity: 0,
  _hover: {
    cursor: 'pointer',
    opacity: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-10px)',
    transition: 'all 0.2s ease-in-out',
    _active: {
      cursor: 'pointer',
      backgroundColor: 'hover.white',
    },
  },
}