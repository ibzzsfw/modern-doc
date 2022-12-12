import {
  Box,
  Button,
  chakra,
  Icon,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import FormInput from '@components/FormInput.component'
import OTPVerify from '@components/OTPVerify.component'
import User from '@view-models/User'
import UserController from '@view-models/UserController'
import { LoginDataModel } from '@models/LoginDataStore.model'
import { LoginPageModel } from '@models/LoginPageStore.model'
import { useMutation } from '@tanstack/react-query'
import { Form, Formik } from 'formik'
import { AiFillLock, AiFillPhone } from 'react-icons/ai'
import * as Yup from 'yup'
import { phoneLogin, validateOTP } from '@firebase'
import { withCountryCode, withoutCountryCode } from '@utils/formatPhoneNumber'
import { useState } from 'react'
import { AxiosError } from 'axios'

const Login = () => {

  const toast = useToast()
  const setUserData = LoginDataModel((state) => state.setUserData)
  const setFamilyMembers = LoginDataModel((state) => state.setFamilyMembers)
  const setTabIndex = LoginPageModel((state) => state.setTabIndex)

  const loginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
      .length(10, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก')
      .required('จำเป็นต้องกรอก'),
    password: Yup.string().required('จำเป็นต้องกรอก'),
  })

  const [confirmationResult, setConfirmationResult] = useState<any>(null)

  const { mutate: onVerifySuccess } = useMutation(
    async (credential: any) => {
      return UserController.login(
        withoutCountryCode(credential.user.phoneNumber)
      )
    },
    {
      onSuccess: (data: any) => {
        toast({
          title: 'เข้าสู่ระบบสำเร็จ',
          description: `ยินดีต้อนรับสู่ระบบนะคุณ ${data.firstName}`,
          status: 'success',
          duration: 5000,
        })
        setUserData(
          new User({
            id: data.id,
            householdId: data.householdId,
            title: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            citizenId: data.citizenId,
            phoneNumber: data.phoneNumber,
            sex: data.sex,
            token: data.token,
            relationship: data.relationship,
            profileURI: data.profileURI,
            email: data.email,
            birthDate: data.birthDate,
          })
        )

        setFamilyMembers(data.familyMembers)
        setTimeout(() => {
          window.location.pathname = '/home'
        }, 1500)
      },
      onError: (error: AxiosError) => {
        toast({
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          description: 'กรุณาตรวจสอบเบอร์โทรศัพท์หรือรหัสผ่าน',
          status: 'error',
          duration: 5000,
        })
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      },
    }
  )

  type loginForm = {
    phoneNumber: string
    password: string
  }
  const { mutate: onClickLogin } = useMutation(
    async ({ phoneNumber, password }: loginForm) =>
      UserController.checkPhonePassword({ phoneNumber, password }),
    {
      onSuccess: async (data: any) => {
        let phoneNumber = data.phoneNumber
        setConfirmationResult(await phoneLogin(withCountryCode(phoneNumber)))
      },
      onError: (error: AxiosError) => {
        toast({
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          description: 'กรุณาตรวจสอบเบอร์โทรศัพท์หรือรหัสผ่าน',
          status: 'error',
          duration: 5000,
        })
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      },
    }
  )

  return (
    <Box sx={layout}>
      <Formik
        initialValues={{
          phoneNumber: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          if (process.env.VITE_USE_OTP_AUTH == 'true') {
            onClickLogin({
              phoneNumber: values.phoneNumber,
              password: values.password,
            })
          } else {
            onVerifySuccess({
              user: {
                phoneNumber: values.phoneNumber,
              },
            })
          }
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

          <div id="recaptcha-container"></div>
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
      {confirmationResult && (
        <OTPVerify
          phoneNumber="0939465199"
          onSubmit={async (otp) => {
            onVerifySuccess(await validateOTP(otp, confirmationResult))
          }}
        />
      )}
    </Box>
  )
}

export default Login

let layout = {
  width: '100%',
  margin: 'auto',
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