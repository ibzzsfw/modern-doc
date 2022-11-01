import FamilyInfoBox from '@components/FamilyInfoBox'
import {
  Button,
  Box,
  VStack,
  Flex,
  Center,
  Wrap,
  Link,
  Icon,
  useDisclosure,
} from '@chakra-ui/react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import MenuProvider from '@components/MenuProvider'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import { useState } from 'react'
import ManageFamilyMember from '@components/ManageFamilyMember'
import ModalProvider from '@components/ModalProvider'

const FamilyPage = () => {
  const [family, setfamily] = useState([
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
  const [memberState, setmemberState] = useState(2)
  const { isOpen, onOpen, onClose } = useDisclosure()

  let threeDot = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    color: 'accent.black',
  }
  const changeNormalstate = () => {
    setmemberState(2)
  }
  const editmember = () => {
    setmemberState(1)
  }
  const deleteFamily = () => {
    console.log('delete')
    family.pop()
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
            onClick: () => {
              editmember()
            },
          },
        ],
        [
          {
            title: 'ลบสมาชิก',
            icon: <Icon as={BsTrash} color="accent.red" />,
            onClick: () => {
              onOpen()
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

  return memberState == 0 ? (
    <ManageFamilyMember cancel={changeNormalstate} isEdit="add" />
  ) : memberState == 1 ? (
    <ManageFamilyMember
      cancel={changeNormalstate}
      isEdit="edit"
      data={family[1]}
    />
  ) : (
    <Center>
      <Box width="909px">
        <VStack>
          <Box width="100%" textAlign="right">
            <Button
              variant="solid"
              color="accent.blue"
              sx={editButton}
              leftIcon={<AiOutlineUserAdd />}
              onClick={() => {
                setmemberState(0)
              }}
            >
              เพิ่มสมาชิก
            </Button>
          </Box>
          <Wrap spacing="28px">
            {family.map((values, index) => {
              return (
                <>
                  <FamilyInfoBox
                    menuComponent={menu}
                    menuActive="true"
                    data={values}
                  />

                  <ModalProvider
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    firstName={values.firstName}
                    lastName={values.lastName}
                    callback={deleteFamily}
                  />
                </>
              )
            })}
          </Wrap>
        </VStack>
      </Box>
    </Center>
  )
}

export default FamilyPage
