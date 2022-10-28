import { Box, Center, Flex, HStack, Image,Icon } from '@chakra-ui/react'
import FamilyInputform from './FamilyInputform'
import MenuProvider from './MenuProvider'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'

const FamilyInfo = () => {
  let boxLayout = {
    backgroundColor: 'background.white',
    width: '909px',
    height: '258px',
    margin: 'auto',
    borderRadius: '8px',
    position: 'relative'
  }
  let threeDot = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    color: 'accent.black',
  }

  let menu = (
    <MenuProvider
      left = "690px"
      top =  "36px"
      menusList={[
        [
          {
            title: 'แก้ไขข้อมูลสมาชิก',
            icon: <Icon as={BiEdit} />,
            onClick: () => {},
          },
        ],
        [
          {
            title: 'ลบสมาชิก',
            icon: <Icon as={BsTrash} color="accent.red" />,
            onClick: () => {},
            style: {
              color: 'accent.red',
            },
          },
        ],
      ]}
    >
      <Icon as={BsThreeDots} sx={threeDot} boxSize="18px" />
    </MenuProvider>
  )
  

  return (
    <Box sx={boxLayout}>
        <Flex justifyContent='center' height='100%'>
          <HStack gap="32px">
            <Image src="https://bit.ly/sage-adebayo" boxSize="206px" borderRadius = '8px' />
            <FamilyInputform menu={menu}  />
          </HStack>
        </Flex>
    </Box>
  )
}

export default FamilyInfo
