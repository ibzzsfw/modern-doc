import {
  Box,
  Flex,
  HStack,
  Image,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import FamilyInputform from './FamilyInputform'
import { useFamilyPageStore } from '@stores/FamilyPageStore'
import MenuProvider from '@components/MenuProvider'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'

interface dataTypes {
  id: number
  prefix: string
  firstName: string
  lastName: string
  relationship: string
  citizenId: string
}

type propsType = {
  data?: dataTypes
  activeForm?: boolean | 'true' | 'false'
  menuActive?: boolean
  disablecitizenId?: boolean | 'false' | 'true'
}
const FamilyInfoBox = ({
  data,
  activeForm,
  disablecitizenId,
  menuActive,
}: propsType) => {
  const [editFamily, setEditFamily] = useState(false)
  const { setPage, mode, setMode } = useFamilyPageStore()
  const { isOpen, onOpen, onClose } = useDisclosure()

  let boxLayout = {
    backgroundColor: 'background.white',
    margin: 'auto',
    borderRadius: '8px',
    position: 'relative',
    padding: '20px',
    width: '909px',
  }
  let threeDot = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    color: 'accent.black',
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
              console.log(`edit ${data?.firstName + ' ' + data?.lastName}`)
              setMode('edit')
              setEditFamily(true)
            },
          },
        ],
        [
          {
            title: 'ลบสมาชิก',
            icon: <Icon as={BsTrash} color="accent.red" />,
            onClick: () => {
              console.log(`delete ${data?.firstName + ' ' + data?.lastName}`)
              console.log('delete in store')
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

  let deleteModal = (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ลบสมาชิก</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          คุณต้องการลบสมาชิก{' '}
          <Text as="b">{data?.firstName + ' ' + data?.lastName}</Text>{' '}
          ใช่หรือไม่
          <br />
          (เอกสารร่วมจะหายไปด้วย)
        </ModalBody>
        <ModalFooter>
          <Flex gap="22px">
            <Button variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button variant="solid" colorScheme="red" onClick={() => {}}>
              ลบ
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  let addFamilySuccess = {
    title: 'เพิ่มสมาชิกสำเร็จ',
    status: 'success',
    duration: 3000,
  }

  let editFamilySuccess = {
    title: 'แก้ไขข้อมูลสมาชิกสำเร็จ',
    status: 'success',
    duration: 3000,
  }

  return mode === 'edit' ? (
    <Box sx={boxLayout}>
      <Flex height="100%">
        <HStack gap="32px">
          <Image
            src="https://bit.ly/sage-adebayo"
            boxSize="206px"
            borderRadius="8px"
          />
          <FamilyInputform
            menu={menuActive ? menu : null}
            disable={activeForm || editFamily}
            id={data?.id}
            prefix={data?.prefix}
            firstName={data?.firstName}
            lastName={data?.lastName}
            relationship={data?.relationship}
            citizenId={data?.citizenId}
            citizenIdDisable="true"
            callBack={() => {
              setEditFamily(false)
            }}
            toastDiscription={editFamilySuccess}
            modal={deleteModal}
          />
        </HStack>
      </Flex>
    </Box>
  ) : (
    <Box sx={boxLayout}>
      <Flex height="100%">
        <HStack gap="32px">
          <Image
            src="https://bit.ly/sage-adebayo"
            boxSize="206px"
            borderRadius="8px"
          />
          <FamilyInputform
            menu={menuActive ? menu : null}
            disable={activeForm}
            citizenIdDisable={false}
            callBack={() => {
              setMode('edit')
              setPage(1)
            }}
            toastDiscription={addFamilySuccess}
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default FamilyInfoBox

/**  */
