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
} from '@chakra-ui/react'
import { useRegisterStore } from '@stores/RegisterStore'
import FormInput from '@components/FormInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { AiTwotoneCalendar } from 'react-icons/ai'

const Register = () => {
  const { page, setPage, prefix, sex } = useRegisterStore()

  const registerSchema = Yup.object().shape({
    prefix: Yup.mixed().oneOf(prefix),
    firstName: Yup.string().required('จำเป็นต้องกรอก'),
    lastName: Yup.string().required('จำเป็นต้องกรอก'),
    sex: Yup.mixed().oneOf(sex).required('จำเป็นต้องกรอก'),
    birthDate: Yup.string().required('จำเป็นต้องกรอก'),
    citizenId: Yup.string()
      .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
      .length(13, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก')
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
          prefix: '',
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
          console.log(values)
        }}
      >
        <Form>
          {page === 1 && (
            <VStack marginTop="16px">
              <FormInput
                label="คำนำหน้า"
                name="prefix"
                type="select"
                placeholder="--เลือกคำนำหน้า--"
                options={prefix}
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
            )}
          </HStack>
        </Form>
      </Formik>
    </Box>
  )
}

export default Register
