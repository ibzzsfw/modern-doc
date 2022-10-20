import {
  Box,
  Button,
  chakra,
  Flex,
  Image,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react'
import FormInput from '@components/FormInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useLoginStore } from '@/stores/LoginStore'
import { AiFillPhone, AiFillLock } from 'react-icons/ai'
import { loginWithGithub, loginWithGoogle, loginWithFacebook } from '@/firebase'

const Login = () => {
  let layout = {
    width: '100%',
    margin: 'auto',
  }

  let logoBar = {
    justifyContent: 'space-around',
    marginBottom: '28px',
  }

  let providerLogo = {
    width: '48px',
    height: '48px',
    cursor: 'pointer',
    borderRadius: '100%',
  }

  let submitButton = {
    width: '102px',
    height: '40px',
    backgroundColor: 'accent.blue',
    color: 'white',
    margin: 'auto',
    _hover: {
      backgroundColor: 'hover.blue',
    },
    _active: {
      backgroundColor: 'hover.blue',
    },
  }

  const loginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
      .length(10, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก')
      .required('จำเป็นต้องกรอก'),
    password: Yup.string().required('จำเป็นต้องกรอก'),
  })

  const { setTabIndex } = useLoginStore()

  return (
    <Box sx={layout}>
      <Flex sx={logoBar}>
        <Image src="/assets/facebook.png" sx={providerLogo} onClick={()=>loginWithFacebook()}/>
        <Image src="/assets/google.png" sx={providerLogo} onClick={()=>loginWithGoogle()}/>
        <Image src="/assets/github.png" sx={providerLogo} onClick={()=>loginWithGithub()}/>
      </Flex>
      <Formik
        initialValues={{
          phoneNumber: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <Form>
          <VStack marginBottom="48px">
            <FormInput
              label="เบอร์โทรศัพท์"
              name="phoneNumber"
              type="tel"
              placeholder="กรอกเบอร์โทรศัพท์"
              rightElement={<Icon as={AiFillPhone} />}
              format="XXX-XXX-XXXX"
            />
            <FormInput
              label="รหัสผ่าน"
              name="password"
              type="password"
              placeholder="กรอกรหัสผ่าน"
              rightElement={<Icon as={AiFillLock} />}
            >
              <Text
                color="accent.gray"
                fontSize="14px"
                marginTop="4px"
                textAlign="right"
              >
                หรือไม่มีบัญชีผู้ใช้ ?{' '}
                <chakra.span color="accent.blue" cursor="pointer">
                  รีเซ็ตรหัสผ่าน
                </chakra.span>
              </Text>
            </FormInput>
          </VStack>

          <VStack margin="auto" gap="8px">
            <Button sx={submitButton} type="submit">
              เข้าสู่ระบบ
            </Button>
            <Text color="accent.gray" fontSize="14px">
              หรือไม่มีบัญชีผู้ใช้ ?{' '}
              <chakra.span
                color="accent.blue"
                cursor="pointer"
                onClick={() => setTabIndex(1)}
              >
                ลงทะเบียน
              </chakra.span>
            </Text>
          </VStack>
        </Form>
      </Formik>
    </Box>
  )
}

export default Login
