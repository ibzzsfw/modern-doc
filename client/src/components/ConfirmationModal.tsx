import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

type propsType = {
  title?: string
  discirption?: string
  onClick?: () => void
}

const ConfirmationModal = ({ title, discirption, onClick }: propsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>

          <ModalBody>{discirption}</ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              ยกเลิก
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                if (onClick) onClick()
                onClose()
              }}
            >
              ตกลง
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConfirmationModal
