import {
  Box,
  Avatar,
  useDisclosure,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  HStack,
  VStack,
  Text,
  Flex,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  useToast,
  Link,
} from '@chakra-ui/react'
import { BsPersonCircle } from 'react-icons/bs'
import { IoChevronDownOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'
import { BiLogOutCircle } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import { useLoginDataStore } from '@stores/LoginDataStore'
import getRelationshipText from '@utils/getRelationshipText'
import shallow from 'zustand/shallow'
import User from '@models/User'
import { useNavigate } from 'react-router-dom'
import UserController from '@models/UserController'

const NavbarAvatar = () => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure()
  const [memberID, setMemberID] = useState<number | null>(null)
  const [members, setmembers] = useState([
    {
      id: 0,
      name: 'ใจฟู ศิลาคงกะพัน',
      relation: 'เจ้าของบัญชี',
      url: 'https://djj.georgia.gov/sites/djj.georgia.gov/files/styles/square/public/2020-04/john_edwards2.jpg?h=0ca7a621&itok=JwTUG3Ja',
    },
    {
      id: 1,
      name: 'ใจโซเซ ศิลาคงกะพัน',
      relation: 'น้อง',
      url: 'https://blogs-images.forbes.com/natalierobehmed/files/2017/08/x-1-1200x800.jpg',
    },
    {
      id: 2,
      name: 'ใจดี ศิลาคงกะพัน',
      relation: 'น้อง',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Ajay_Actor.jpg/640px-Ajay_Actor.jpg',
    },
    {
      id: 3,
      name: 'ใจเกเร ศิลาคงกะพัน',
      relation: 'พี่',
      url: 'https://s.isanook.com/jo/0/rp/r/w300/ya0xa0m1w0/aHR0cHM6Ly9qb294LWNtcy1pbWFnZS0xMjUxMzE2MTYxLmZpbGUubXlxY2xvdWQuY29tLzIwMjEvMDkvMjgvMGIzZmQ5ZGQtMTYxMi00ZmZiLTk5YjQtMzA2MWJkODI1MzA3LmpwZy8xMDAw.jpg',
    },
  ])
  const [owner, setOwner] = useState({
    id: 1,
    name: 'ใจโซเซ ศิลาคงกะพัน',
    relation: 'เจ้าของบัญชี',
    url: 'https://djj.georgia.gov/sites/djj.georgia.gov/files/styles/square/public/2020-04/john_edwards2.jpg?h=0ca7a621&itok=JwTUG3Ja',
  })

  const [x, setX] = useState(0)
  const [isExpand, setIsExpand] = useState(false)

  //set x to height scroll from top
  useEffect(() => {
    const handleScroll = () => {
      setX(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const userJson = useLoginDataStore((state) => state.user, shallow)
  const user = userJson ? new User(userJson) : null

  const familyMembers = useLoginDataStore(
    (state) => state.familyMembers,
    shallow
  )
  

  if (!user) return null
  return (
    <Box position="relative">
      <Avatar
        sx={navbarAvatar}
        onClick={() => onOpen()}
        src={user.profileURI}
      />
      <Popover isOpen={isOpen} onClose={onClose} placement="bottom-start">
        <PopoverContent sx={menuLayout}>
          <PopoverHeader>
            <HStack justifyContent="space-around">
              {/* <Avatar sx={menuAvatar} src={user.profileURI} /> */}
              <VStack alignItems="flex-start">
                <Text sx={nameText}>{user.getFullName()}</Text>
                <Text sx={relationText}>{user.getRelationshipText()}</Text>
              </VStack>
            </HStack>
          </PopoverHeader>
          <PopoverBody padding="4px">
            <Flex flexDirection="column" gap="2px">
              <Flex as="button" sx={menuButton}>
                <Icon as={BsPersonCircle} />
                <Text sx={menuText} onClick={() => navigate('/myprofile')}>
                  ข้อมูลส่วนตัว
                </Text>
              </Flex>
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton padding="2px" borderRadius="4px">
                    <Flex
                      as="button"
                      sx={menuButton}
                      justifyContent="space-between"
                      onClick={() => setIsExpand(!isExpand)}
                    >
                      <Text sx={menuText}>สมาชิกครอบครัว</Text>
                      {!isExpand ? (
                        <Icon as={IoChevronForwardOutline} />
                      ) : (
                        <Icon as={IoChevronDownOutline} />
                      )}
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel padding="0">
                    {familyMembers.map((member, index) => {
                      return (
                        <Link
                          onClick={() => {
                            onOpenModal()
                            // setMemberID(member.id)
                          }}
                        >
                          <Flex as="button" sx={memberList}>
                            <Avatar sx={memberAvatar} src={member.profileURI} />
                            <Text sx={memberNameText}>
                              {member.firstName} {member.lastName}
                            </Text>
                          </Flex>

                          <Modal
                            isOpen={isOpenModal}
                            onClose={onCloseModal}
                            isCentered
                          >
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>สลับสมาชิก</ModalHeader>
                              <ModalBody>
                                <Text>
                                  ต้องการสลับสมาชิกเป็น{' '}
                                  <Text as="b">
                                    {member.firstName} {member.lastName}
                                  </Text>{' '}
                                  หรือไม่
                                </Text>
                              </ModalBody>
                              <ModalFooter>
                                <Flex gap="22px">
                                  <Button
                                    onClick={onCloseModal}
                                    sx={editButton}
                                  >
                                    ยกเลิก
                                  </Button>
                                  <Button
                                    sx={submitButton}
                                    onClick={onCloseModal}
                                  >
                                    สลับ
                                  </Button>
                                </Flex>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </Link>
                      )
                    })}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Divider />
              <Box>
                <Flex
                  as="button"
                  sx={menuButton}
                  onClick={() => navigate('/family')}
                >
                  <Icon as={MdGroups} />
                  <Text sx={menuText}>จัดการสมาชิกครอบครัว</Text>
                </Flex>
              </Box>
              <Divider />
              <Flex
                as="button"
                sx={menuButton}
                onClick={() => UserController.logout()}
              >
                <Icon as={BiLogOutCircle} color="accent.red" />
                <Text sx={menuText} color="accent.red">
                  ออกจากระบบ
                </Text>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default NavbarAvatar

const navbarAvatar = {
  width: '48px',
  height: '48px',
  cursor: 'pointer',
  borderRadius: '100%',
}

const menuLayout = {
  top: '56px',
  left: '-76%',
  width: '224px',
}

const menuAvatar = {
  width: '64px',
  height: '64px',
  borderRadius: '100%',
}

const nameText = {
  fontSize: '14px',
  fontWeight: 'semibold',
}

const memberNameText = {
  fontSize: '14px',
  fontWeight: 'normal',
}

const relationText = {
  fontSize: '12px',
  fontWeight: 'normal',
}

const menuText = {
  fontSize: '14px',
  fontWeight: 'semibold',
}

const menuButton = {
  width: '100%',
  textAlign: 'left',
  padding: '8px 16px',
  alignItems: 'center',
  height: '40px',
  gap: '12px',
  borderRadius: '4px',
  _hover: {
    background: 'background.gray',
  },
}
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
let submitButton = {
  height: '40px',
  backgroundColor: 'accent.blue',
  color: 'white',

  variant: 'outline',
  _hover: {
    backgroundColor: 'hover.blue',
  },
  _active: {
    backgroundColor: 'hover.white',
  },
}

const memberList = {
  width: '100%',
  textAlign: 'left',
  padding: '8px 24px',
  alignItems: 'center',
  height: '36px',
  gap: '12px',
  borderRadius: '4px',
  _hover: {
    background: 'background.gray',
  },
}

const memberAvatar = {
  width: '24px',
  height: '24px',
}
/*
members.map((member)=>{
  return(
    <Flex as="button" sx={memberList}>
    <Avatar sx={memberAvatar} src = {member.url}/>
    <Text sx={memberNameText}>{member.name}</Text>
  </Flex>
  )
})

members.filter((member)=>{
                      return member.id > 0
                    }).map((member)=>{
                      return(
                        <Flex as="button" sx={memberList}>
                        <Avatar sx={memberAvatar} src = {member.url}/>
                        <Text sx={memberNameText}>{member.name}</Text>
                      </Flex>
                      )
                    }*/
