import {
  Text,
  Box,
  Button,
  Image,
  Input,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  HStack,
  Flex,
  chakra,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Icon,
  Center,
} from '@chakra-ui/react'
import { MdAccountCircle, MdFormatLineSpacing } from 'react-icons/md'
import { AiFillLock } from 'react-icons/ai'
import { useLoginStore } from '@stores/loginStore'
import { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Login = () => {
  let layout = {
    width: '320px',
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

  const { phone, password, setPhone, setPassword } = useLoginStore()

  const loginSchema = Yup.object().shape({
    phone: Yup.string()
      .length(10, 'Must be 10 digits')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Required'),
    password: Yup.string().required('Required'),
  })

  const renderInput = (props: any) => {
    return (
      <InputGroup>
        <Input
          name="phoneNumber"
          type="tel"
          placeholder="กรอกเบอร์โทร"
          {...props}
        />
        <InputRightElement>
          <Icon as={MdAccountCircle} />
        </InputRightElement>
      </InputGroup>
    )
  }

  useEffect(() => {
    console.log(phone)
  }, [phone])

  return (
    <Box sx={layout}>
      <Flex sx={logoBar}>
        <Image src="/assets/facebook.png" sx={providerLogo} />
        <Image src="/assets/google.png" sx={providerLogo} />
        <Image src="/assets/github.png" sx={providerLogo} />
      </Flex>
      <Formik
        initialValues={{
          phoneNumber: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Form>
          <VStack marginBottom='48px'>
            <FormControl>
              <FormLabel>เบอร์โทร</FormLabel>
              <Field
                name="password"
                type="password"
                as={(props: any) => (
                  <InputGroup>
                    <Input
                      name="phoneNumber"
                      type="tel"
                      placeholder="กรอกเบอร์โทร"
                      {...props}
                    />
                    <InputRightElement>
                      <Icon as={MdAccountCircle} />
                    </InputRightElement>
                  </InputGroup>
                )}
              />
              <ErrorMessage name="phoneNumber" component="div" />
            </FormControl>

            <FormControl>
              <FormLabel>รหัสผ่าน</FormLabel>
              <Field
                name="password"
                type="password"
                as={(props: any) => (
                  <InputGroup>
                    <Input
                      name="password"
                      type="password"
                      placeholder="กรอกรหัสผ่าน"
                    />
                    <InputRightElement>
                      <Icon as={AiFillLock} />
                    </InputRightElement>
                  </InputGroup>
                )}
              />
              <ErrorMessage name="password" component="div" />
              <Text color="accent.gray" fontSize="14px" marginTop="8px">
                หรือไม่มีบัญชีผู้ใช้ ?{' '}
                <chakra.span color="accent.blue" cursor="pointer">
                  รีเซ็ตรหัสผ่าน
                </chakra.span>
              </Text>
            </FormControl>
          </VStack>
          <VStack margin="auto" gap="8px">
            <Button sx={submitButton} type="submit">
              เข้าสู่ระบบ
            </Button>
            <Text color="accent.gray" fontSize="14px">
              หรือไม่มีบัญชีผู้ใช้ ?{' '}
              <chakra.span color="accent.blue" cursor="pointer">
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
