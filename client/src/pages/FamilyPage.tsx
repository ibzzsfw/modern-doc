import FamilyInfo from '@/components/FamilyInfoBox'
import {
  Button,
  Box,
  VStack,
  Flex,
  Center,
  Wrap,
  Link,
  Icon,
  useToast,
} from '@chakra-ui/react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import MenuProvider from '@/components/MenuProvider'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import { useState } from 'react'


const FamilyPage = () => {
  var [family, setfamily] = useState([
    {
      id: 1,
      prefix: 'เด็กชาย',
      firstName: 'ใจดี',
      lastName: 'ศิลาคงกะพัน',
      relationship: 'น้อง',
      citizenId: '1 4487 55284 32 0',
    },
    {
      id: 2,
      prefix: 'เด็กหญิง',
      firstName: 'ใจโซเซ',
      lastName: 'ศิลาคงกะพัน',
      relationship: 'น้อง',
      citizenId: '1 4487 77554 41 7',
    },
    {
      id: 3,
      prefix: 'นาย',
      firstName: 'ใจเกเร',
      lastName: 'ศิลาคงกะพัน',
      relationship: 'พี่',
      citizenId: '5 4487 45563 21 4',
    },
  ])

  let threeDot = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    color: 'accent.black',
  }
  const deleteFamily = () => {
    const showToast = new Promise((resolve, reject) => {

    })
    
    console.log('delete')
    family.pop()
    console.log(family)
    setfamily([...family])
        
  }

  let menu = (
    <MenuProvider
      left="690px"
      top="36px"
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
            onClick: () => {
              
            },
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
  let editButton = {
    width: 'auto',
    height: '40px',
    backgroundColor: 'accent.white',
    color: 'black',
    right: '0px',
    variant: 'outline',
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
    <Center>
      <Box width="909px">
        <VStack>
          <Box width="100%" textAlign="right">
            <Link href="/family/add">
              <Button
                variant="solid"
                color="accent.blue"
                sx={editButton}
                leftIcon={<AiOutlineUserAdd />}
              >
                เพิ่มสามาชิก
              </Button>
            </Link>
          </Box>
          <Button onClick={(e)=>{deleteFamily()}}>delete</Button>
          <Wrap spacing="28px">
            {family.map((values) => {
              return (
                <FamilyInfo
                  menuComponent={menu}
                  menuActive="true"
                  data={values}
                />
              )
            })}
          </Wrap>
        </VStack>
      </Box>
    </Center>
  )
}

export default FamilyPage
