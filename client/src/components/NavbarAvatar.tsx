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
} from '@chakra-ui/react'
import { BsPersonCircle } from 'react-icons/bs'
import { IoChevronDownOutline } from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'

const NavbarAvatar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const memberAvatar = {
    width: '24px',
    height: '24px',
  }

  return (
    <Box position="relative">
      <Avatar
        sx={navbarAvatar}
        onClick={() => onOpen()}
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/03c8d383-c259-4476-810e-9d8e743c41d1/df4ltk2-9e4c2d72-fd7c-4d9b-b274-01cd6a854766.jpg/v1/fill/w_1280,h_930,q_75,strp/shizuka_minamoto_by_pokearceus_df4ltk2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTMwIiwicGF0aCI6IlwvZlwvMDNjOGQzODMtYzI1OS00NDc2LTgxMGUtOWQ4ZTc0M2M0MWQxXC9kZjRsdGsyLTllNGMyZDcyLWZkN2MtNGQ5Yi1iMjc0LTAxY2Q2YTg1NDc2Ni5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.RFbK97fH9EaxF2W8t5_baFVLT85jq3SaN-LbEfKiFck"
      />
      <Popover isOpen={isOpen} onClose={onClose} placement="right-end">
        <PopoverContent sx={menuLayout}>
          <PopoverHeader>
            <HStack justifyContent="space-around">
              <Avatar
                sx={menuAvatar}
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/03c8d383-c259-4476-810e-9d8e743c41d1/df4ltk2-9e4c2d72-fd7c-4d9b-b274-01cd6a854766.jpg/v1/fill/w_1280,h_930,q_75,strp/shizuka_minamoto_by_pokearceus_df4ltk2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTMwIiwicGF0aCI6IlwvZlwvMDNjOGQzODMtYzI1OS00NDc2LTgxMGUtOWQ4ZTc0M2M0MWQxXC9kZjRsdGsyLTllNGMyZDcyLWZkN2MtNGQ5Yi1iMjc0LTAxY2Q2YTg1NDc2Ni5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.RFbK97fH9EaxF2W8t5_baFVLT85jq3SaN-LbEfKiFck"
              />
              <VStack alignItems="flex-start">
                <Text sx={nameText}>มินาโมโตะ ชิซุกะ</Text>
                <Text sx={relationText}>เจ้าของบัญชี</Text>
              </VStack>
            </HStack>
          </PopoverHeader>
          <PopoverBody padding="4px">
            <Flex flexDirection="column" gap="2px">
              <Flex as="button" sx={menuButton}>
                <Icon as={BsPersonCircle} />
                <Text sx={menuText}>ข้อมูลส่วนตัว</Text>
              </Flex>
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton padding="2px" borderRadius="4px">
                    <Flex as="button" sx={menuButton}>
                      <Text sx={menuText}>สมาชิกครอบครัว</Text>
                      <Icon as={IoChevronDownOutline} />
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel padding="0">
                    <Flex as="button" sx={menuButton}>
                      <Avatar sx={memberAvatar} />
                      <Text sx={memberNameText}>อลัน สมิธ</Text>
                    </Flex>
                    <Flex as="button" sx={menuButton}>
                      <Avatar sx={memberAvatar} />
                      <Text sx={memberNameText}>อริธ สมัน</Text>
                    </Flex>
                    <Flex as="button" sx={menuButton}>
                      <Avatar sx={memberAvatar} />
                      <Text sx={memberNameText}>ดิโอโก้ ดาโลต์</Text>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Divider />
              <Flex as="button" sx={menuButton}>
                <Icon as={MdGroups} />
                <Text sx={menuText}>จัดการสมาชิกครอบครัว</Text>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default NavbarAvatar
