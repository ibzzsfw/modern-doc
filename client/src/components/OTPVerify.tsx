import {
  Box,
  PinInput,
  PinInputField,
  Heading,
  Text,
  Button,
  useToast,
  Link,
  VStack,
  HStack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'

type propsType = {
  phoneNumber?: string
  onSubmit(otp: string): void
}

const OTPVerify = ({ phoneNumber, onSubmit }: propsType) => {
  const toast = useToast()
  let shadow = {
    height: '396px',
    width: '320px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 5px 10px 2px rgba(0, 0, 0, 0.1)',
    border: '1px solid accent.lightGray',
  }

  const [otp, setOtp] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Modal isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent padding="24px">
        <ModalHeader>OTP Verification</ModalHeader>
        <ModalBody>
          <VStack gap="24px" marginTop="32px">
            <HStack>
              <PinInput
                autoFocus
                placeholder=""
                onChange={(value) => {
                  setOtp(value)
                }}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>

            <Text fontSize="sm" textAlign="center">
              เราได้ส่งรหัส OTP 6 ตัวไปยังหมายเลขโทรศัพท์{' '}
              <Text as="b" color="blue">
                {phoneNumber}
              </Text>{' '}
              โปรดนำรหัสที่ได้มาใส่ในช่องด้านบน
            </Text>
            <Text>
              <Link as="b" color="blue">
                คลิกที่นี่{' '}
              </Link>
              เพื่อส่งรหัส OTP ใหม่
            </Text>
            <Button colorScheme="blue" onClick={() => onSubmit(otp)}>
              ยืนยัน
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default OTPVerify
