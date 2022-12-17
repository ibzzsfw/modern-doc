import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import ChangePassword from '@components/ChangePassword.component.'
import FormInput from '@components/FormInput.component'
// import { MyProfiledataModel } from '@models/MyProfiledataStore.model'
import { MyProfilePageModel } from '@models/MyProfilePageStore.model'
import UserModel from '../../mvvm/models/User.model'
import UserController from '../../mvvm/view-models/UserController'
import { Form, Formik } from 'formik'
import { useMutation } from '@tanstack/react-query'

const ProfileFormInput = ({ data }: any) => {

  const { isEdit, setEdit } = MyProfilePageModel()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setUser } = UserModel()

  const selectOptions = {
    title: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'],
    sex: ['ชาย', 'หญิง'],
    subDistrict: ['ดาวคะนอง'],
    district: ['ธนบุรี'],
    province: ['กรุงเทพมหานคร'],
    postalCode: ['10600'],
  }

  const handleform = (values: any) => {
    setUser({ ...user, ...values })
  }
  const updateUser = useMutation((value: any) => {
    return UserController.editProfile(value.title, value.firstName, value.lastName, value.sex,
      value.phoneNumber, value.birthDate, value.profileURI, value.password)
  }, {
    onSuccess: (data) => { },
    onError: (error) => { },
  })
  const confirmPassword = useMutation((value: { phoneNumber: string, password: string }) => {
    return UserController.checkPhonePassword(value.phoneNumber, value.password)
  }, {
    onSuccess: (data) => { return true },
    onError: (error) => { return false },
  })

  const updateProfile = (values: any) => { }

  const confirmPasswordModal = (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size="sm"
        isCentered
      >
        <ModalOverlay />

        <ModalContent justifyContent="center">
          <ModalHeader>ยืนยันการแก้ไขข้อมูล</ModalHeader>
          <Formik
            initialValues={{
              password: '',
            }}
            onReset={(values) => {
              onClose()
            }}
            onSubmit={(values, actions) => {
            }}
          >
            <Form>
              <ModalBody>
                <FormInput
                  label="รหัสผ่านยืนยัน"
                  name="password"
                  type="password"
                  placeholder="กรอกรหัสผ่านเพื่อยืนยัน"
                />
              </ModalBody>

              <ModalFooter justifyContent="center">
                <Flex gap="22px">
                  <Button variant="outliวัยne" type="reset">
                    ยกเลิก
                  </Button>
                  <Button variant="solid" colorScheme="blue" type="submit">
                    ตกลง
                  </Button>
                </Flex>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )

  return (
    <VStack>
      <Box width="100%" textAlign="right" height="40px">
        <Button
          variant="outline"
          visibility={isEdit ? 'hidden' : 'visible'}
          leftIcon={<FiEdit />}
          onClick={() => {
            setEdit(true)
          }}
        >
          แก้ไขข้อมูลส่วนตัว
        </Button>
      </Box>
      <Text as="b" width="100%">
        ข้อมูลส่วนตัว
      </Text>
      <Divider />

      <Formik
        initialValues={data}
        onReset={(values) => {
          setEdit(false)
        }}
        onSubmit={(values) => {
          handleform(values)
          onOpen()
        }}
      >
        <Form>
          <VStack align="flex-start">
            <FormInput
              label="เลขบัตรประจำตัวประชาชน"
              name="citizenId"
              type="text"
              placeholder="กรอกเลขบัตรประจำตัวประชาชน"
              width="208px"
              disable
            />
            <Flex gap="16px">
              <FormInput
                label="คำนำหน้า"
                name="title"
                type="select"
                options={['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง']}
                placeholder="เลือกคำนำหน้า"
                width="143px"
                disable={!isEdit}
              />
              <FormInput
                label="ชื่อ"
                name="firstName"
                type="text"
                placeholder="กรอกชื่อไม่ต้องระบุคำนำหน้า"
                width="208px"
                disable={!isEdit}
              />
              <FormInput
                label="นามสกุล"
                name="lastName"
                type="text"
                placeholder="กรอกนามสกุล"
                width="226px"
                disable={!isEdit}
              />
            </Flex>
            <Flex gap="16px">
              <FormInput
                label="เพศ"
                name="sex"
                type="select"
                placeholder="--เลือกเพศ--"
                options={selectOptions.sex}
                width="111px"
                disable={!isEdit}
              />
              <FormInput
                label="วัน/เดือน/ปีเกิด"
                name="birthDate"
                type="date"
                placeholder="XX/XX/XXXX"
                width="214px"
                disable={!isEdit}
              />
              <FormInput
                label="หมายเลขโทรศัพท์"
                name="phoneNumber"
                type="text"
                placeholder="08XXXXXXXX"
                width="252px"
                disable={!isEdit}
              />
            </Flex>

            <Flex gap="16px" alignItems="flex-end">
              <FormInput
                label="E-mail ที่ใช้ในการสมัคร"
                name="email"
                type="email"
                placeholder="example@moderndoc.angel.com"
                width="238px"
                disable={!isEdit}
              />
              {!isEdit && <ChangePassword />}
            </Flex>
            <Box height="40px" textAlign="right" width="100%">
              <HStack
                gap="22px"
                justifyContent="flex-end"
                display={isEdit ? 'unset' : 'none'}
              >
                <Button type="reset">ยกเลิก</Button>
                <Button type="submit" colorScheme="blue">
                  ตกลง
                </Button>
              </HStack>
            </Box>
          </VStack>
          {confirmPasswordModal}
        </Form>
      </Formik>
    </VStack>
  )
}

export default ProfileFormInput