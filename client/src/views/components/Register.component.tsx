import {
  Box,
  HStack,
  Progress,
  VStack,
  Text,
  Flex,
  FormControl,
  Button,
  Icon,
  useToast,
} from '@chakra-ui/react'
import { useRegisterStore } from '@models/RegisterStore.model'
import FormInput from '@components/FormInput.component'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import UserController from '@view-models/UserController'
import { useState } from 'react'
import { withCountryCode } from '@utils/formatPhoneNumber'
import { phoneLogin, validateOTP } from '@firebase'
import OTPVerify from '@components/OTPVerify.component'

const Register = () => {
  const { page, setPage, title, sex } = useRegisterStore()
  const toast = useToast()

  const registerSchema = Yup.object().shape({
    title: Yup.mixed().oneOf(title),
    firstName: Yup.string().required('จำเป็นต้องกรอก'),
    lastName: Yup.string().required('จำเป็นต้องกรอก'),
    sex: Yup.mixed().oneOf(sex).required('จำเป็นต้องกรอก'),
    birthDate: Yup.date().required('จำเป็นต้องกรอก'),
    citizenId: Yup.string()
      .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
      .length(13, 'รหัสบัตรประชาชนต้องมี 13 หลัก')
      .required('จำเป็นต้องกรอก'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
      .length(10, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก')
      .required('จำเป็นต้องกรอก'),
    password: Yup.string()
      .min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
      .required('จำเป็นต้องกรอก'),
    confirmPassword: Yup.string().required('จำเป็นต้องกรอก'),
  })
  interface RegisterForm {
    title: string
    firstName: string
    lastName: string
    sex: string
    birthDate: string
    citizenId: string
    phoneNumber: string
    password: string
    confirmPassword: string
  }

  const [confirmationResult, setConfirmationResult] = useState<any>(null)
  const [registerData, setRegisterData] = useState<RegisterForm | null>(null)

  const { mutate: register } = useMutation(
    async (registerData: RegisterForm) => UserController.register(registerData),
    {
      onSuccess: (data: any) => {
        toast({
          title: 'สมัครสมาชิกสำเร็จ',
          description: 'กรุณาเข้าสู่ระบบ',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      },
      onError: (error: AxiosError) => {
        toast({
          title: 'สมัครสมาชิกไม่สำเร็จ',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    }
  )

  const verifyPhone = async (phoneNumber: string) => {
    try {
      console.log(phoneNumber, withCountryCode(phoneNumber))
      setConfirmationResult(await phoneLogin(withCountryCode(phoneNumber)))
    } catch (e) {
      toast({
        title: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
        description: 'กรุณากรอกเบอร์โทรศัพท์ใหม่',
        status: 'error',
      })
    }
  }

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Box width="88%">
          <Progress value={(page / 3) * 100} height="4px" colorScheme="green" />
        </Box>
        <Text>{page}/3</Text>
      </Flex>
      <Formik
        initialValues={{
          title: '',
          firstName: '',
          lastName: '',
          sex: '',
          birthDate: '',
          citizenId: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          verifyPhone(values.phoneNumber)
          setRegisterData(values)
        }}
      >
        <Form>
          {page === 1 && (
            <VStack marginTop="16px">
              <FormInput
                label="คำนำหน้า"
                name="title"
                type="select"
                placeholder="--เลือกคำนำหน้า--"
                options={title}
                showCorrectBorder
              />
              <FormInput
                label="ชื่อ"
                name="firstName"
                type="text"
                placeholder="กรอกชื่อไม่ต้องระบุคำนำหน้า"
                showCorrectBorder
              />
              <FormInput
                label="นามสกุล"
                name="lastName"
                type="text"
                placeholder="กรอกนามสกุล"
                showCorrectBorder
              />
            </VStack>
          )}

          {page === 2 && (
            <VStack marginTop="16px">
              <FormInput
                label="เพศ"
                name="sex"
                type="select"
                placeholder="--เลือกเพศ--"
                options={sex}
                showCorrectBorder
              />
              <FormInput
                label="วัน/เดือน/ปีเกิด"
                name="birthDate"
                type="date"
                placeholder="XX/XX/XXXX"
                rightElement={<Icon as={AiTwotoneCalendar} />}
                showCorrectBorder
              />
              <FormInput
                label="เลขบัตรประจำตัวประชาชน"
                name="citizenId"
                type="text"
                placeholder="0 0000 00000 00 0"
                showCorrectBorder
              />
            </VStack>
          )}

          {page === 3 && (
            <VStack marginTop="16px">
              <FormInput
                label="หมายเลขโทรศัพท์"
                name="phoneNumber"
                type="tel"
                placeholder="0800000000"
                showCorrectBorder
              />
              <FormInput
                label="รหัสผ่าน"
                name="password"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                showCorrectBorder
              />
              <FormInput
                label="ยืนยันรหัสผ่าน"
                name="confirmPassword"
                type="password"
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                showCorrectBorder
              />
            </VStack>
          )}

          <HStack marginTop="24px" justifyContent="space-between">
            <Button
              variant="outline"
              borderColor="accent.gray"
              leftIcon={<Icon as={IoChevronBack} />}
              onClick={() => setPage(page - 1)}
              visibility={page === 1 ? 'hidden' : 'visible'}
            >
              ย้อนกลับ
            </Button>

            {page < 3 ? (
              <Button
                variant="outline"
                borderColor="accent.blue"
                rightIcon={<Icon as={IoChevronForward} />}
                onClick={() => setPage(page + 1)}
              >
                ถัดไป
              </Button>
            ) : (
              <>
                <div id="recaptcha-container"></div>
                {confirmationResult && (
                  <OTPVerify
                    phoneNumber="0939465199"
                    onSubmit={async (otp) => {
                      try {
                        await validateOTP(otp, confirmationResult)
                        if (registerData) {
                          register(registerData)
                        }
                      } catch (e) {
                        toast({
                          title: 'สมัครสมาชิกไม่สำเร็จ',
                          status: 'error',
                          duration: 5000,
                          isClosable: true,
                        })
                        setTimeout(() => {
                          window.location.reload()
                        }, 2000)
                      }
                    }}
                  />
                )}
                <Button
                  type="submit"
                  variant="solid"
                  backgroundColor="accent.blue"
                  color="accent.white"
                  _hover={{
                    backgroundColor: 'hover.blue',
                  }}
                  _active={{
                    backgroundColor: 'hover.blue',
                  }}
                >
                  ลงทะเบียน
                </Button>
              </>
            )}
          </HStack>
        </Form>
      </Formik>
    </Box>
  )
}

export default Register
