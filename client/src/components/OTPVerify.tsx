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
} from '@chakra-ui/react'

type propsType = {
  contact?: string
}

const OTPVerify = ({ contact }: propsType) => {
  const toast = useToast()
  let shadow = {
    height: '396px',
    width: '320px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 5px 10px 2px rgba(0, 0, 0, 0.1)',
    border: '1px solid accent.lightGray',
  }

  return (
    <Center>
      <Box sx={shadow}>
        <VStack gap="24px" marginTop="32px" >
          <Heading>OTP Verification</Heading>
          <HStack>
            <PinInput autoFocus placeholder="x">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          <Text fontSize='sm' textAlign="center" >
            เราได้ส่งรหัส OTP 6 ตัวไปยังหมายเลขโทรศัพท์{' '}
            <Text as="b" color="blue">
              {contact}
            </Text>{' '}
            โปรดนำรหัสที่ได้มาใส่ในช่องด้านบน
          </Text>
          <Text>
            <Link as="b" color="blue">
              คลิกที่นี่
            </Link>
            เพื่อส่งรหัส OTP ใหม่
          </Text>
          <Button colorScheme="blue">ยืนยัน</Button>
        </VStack>
      </Box>
    </Center>
  )
}

export default OTPVerify
