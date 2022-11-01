import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'
import { HiKey } from 'react-icons/hi'

type propTypes = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  firstName?: string
  lastName?: string
  callback?: () => void
}

const ModalProvider = ({
  isOpen,
  onOpen,
  onClose,
  firstName,
  lastName,
  callback,
}: propTypes) => {
  const toast = useToast()
  let deletetost = {
    title: 'ลบสมาชิกในครอบครัวสำเร็จ',
    description: 'คุณได้ลบสมาชิกในครอบครัวเรียบร้อยแล้ว',
    status: 'success',
    duration: 5000,
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ลบสมาชิก</ModalHeader>

          <ModalBody>
            ต้องการลบสามาชิก{' '}
            <Text as="b">
              {firstName} {lastName}
            </Text>{' '}
            หรือไม่
            <br />
            (เอกสารร่วมจะหายไปด้วย)
          </ModalBody>

          <ModalFooter>
            <Flex gap="22px">
              <Button variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={() => {
                  callback()
                  onClose()
                  toast(deletetost)
                }}
              >
                ลบ
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalProvider
