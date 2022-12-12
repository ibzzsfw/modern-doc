import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ListItem,
  UnorderedList,
  useDisclosure,
  Center,
} from '@chakra-ui/react'
import { useEffect } from 'react'

type propsType = {
  title?: string
  description?: string
  documentItem?: any | any[]
  onClick?: () => void
  open?: boolean
  setOpen?: (open: boolean) => void
}

const ConfirmationModal = ({
  title,
  description,
  onClick,
  open,
  setOpen,
  documentItem,
}: propsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if (open) {
      onOpen()
    }
  }, [open])

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

          <ModalBody>
            {description}

            <UnorderedList marginLeft="50px">
              {documentItem &&
                documentItem.map((item: any) => {
                  return (
                    <ListItem fontWeight="bold">{item.officialName}</ListItem>
                  )
                })}
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                if (setOpen) setOpen(false)
                onClose()
              }}
            >
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
