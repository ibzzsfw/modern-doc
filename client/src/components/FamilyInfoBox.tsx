import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import MenuProvider from '@components/MenuProvider'
import { useFamilyPageStore } from '@stores/FamilyPageStore'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import FamilyInputform from './FamilyInputform'

type propsType = {
  data?: {
    id: number
    title: string
    firstName: string
    lastName: string
    relationship: string
    citizenId: string
  }
  boxMode: 'edit' | 'add'
  closeBTN?: () => void
}
const FamilyInfoBox = ({ data, boxMode, closeBTN }: propsType) => {
  const [editMember, setEditMember] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const addFamily = async () => {}

  const editFamily = async () => {}

  const deleteFamily = async () => {}

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
              setEditMember(true)
            },
          },
        ],
        [
          {
            title: 'ลบสมาชิก',
            icon: <Icon as={BsTrash} color="accent.red" />,
            onClick: () => {
              console.log(`delete ${data?.firstName + ' ' + data?.lastName}`)
              onOpen() // open delete modal
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ลบสมาชิก</ModalHeader>
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
            <Button variant="solid" colorScheme="red" onClick={() => {
              //delete api
              deleteFamily()
              toast({
                title: 'ลบสมาชิกสำเร็จ',
                description: `ลบสมาชิก ${data?.firstName + ' ' + data?.lastName} สำเร็จ`,
                status: 'success',
                duration: 3000,
              })
              onClose()
            }}>
              ลบ
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  const addFamilySuccess = {
    title: 'เพิ่มสมาชิกสำเร็จ',
    status: 'success',
    duration: 3000,
  }

  let editFamilySuccess = {
    title: 'แก้ไขข้อมูลสมาชิกสำเร็จ',
    status: 'success',
    duration: 3000,
  }

  return (
    <Box sx={boxLayout}>
      <Flex height="100%">
        <HStack gap="32px">
          <Image
            src="https://bit.ly/sage-adebayo"
            boxSize="206px"
            borderRadius="8px"
          />
          {boxMode === 'add' ? (
            <FamilyInputform
              disable={false}
              formikintialValues={{}}
              citizenIdDisable={false}
              closeBTN={() => {
                if (closeBTN) closeBTN()
              }}
              APIaction={(values) => {
                addFamily()
                //wait api add family
                toast(addFamilySuccess)
                if (closeBTN) closeBTN()
              }}
            />
          ) : (
            <FamilyInputform
              disable={!editMember}
              citizenIdDisable={true}
              closeBTN={() => {
                setEditMember(false)
              }}
              toastDiscription={editFamilySuccess}
              modal={deleteModal}
              formikintialValues={data}
              menu={menu}
              APIaction={() => {
                editFamily()
                toast(editFamilySuccess)
                setEditMember(false)
              }}
            />
          )}
        </HStack>
      </Flex>
    </Box>
  )
}

export default FamilyInfoBox

/**  */

/*
mode === 'edit' ? (
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
          citizenIdDisable={true}
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
)*/
