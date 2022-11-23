import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
    useDisclosure
  } from '@chakra-ui/react'
  import { useEffect, useState } from 'react'

type propsTypes = {
    customButton? : JSX.Element
}


const ShareModal = ({customButton}:propsTypes) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <Modal isOpen = {isOpen} onClose = {onClose}>

        </Modal>
        </>
    )

}


export default ShareModal