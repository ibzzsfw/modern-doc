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
} from '@chakra-ui/react'

const OTPVerify = () => {
const toast = useToast()
const contact = '0987654321'

  return (
  <Box height='396px' width='320px'  backgroundColor = 'white' borderRadius= '8px'>
    <VStack  gap='24px' marginTop='32px' >
    <Heading>OTP Verification</Heading>
    <HStack>
    <PinInput autoFocus placeholder='x'>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>

    </HStack>
 
  <Text>เราได้ส่งรหัส OTP 6 ตัวไปยังหมายเลขโทรศัพท์ <Text as='b' color = 'blue'>{contact}</Text> โปรดนำรหัสที่ได้มาใส่ในช่องด้านบน
     </Text>
  <Text><Link as = 'b' color= 'blue'>คลิกที่นี่</Link>เพื่อส่งรหัส OTP ใหม่</Text>
     <Button colorScheme = 'blue'>ยืนยัน</Button>

    </VStack>
 
  </Box>
  )
}

export default OTPVerify
