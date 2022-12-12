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
  useToast,
  useDisclosure,
  ButtonGroup,
} from '@chakra-ui/react'
import ChangePassword from '@components/ChangePassword'
import FormInput from '@components/FormInput'
import UserType from '@models/UserType'
import { Form, Formik } from 'formik'

import { FiEdit } from 'react-icons/fi'
import { useMyProfileStore } from '@stores/MyProfilePageStore'
import { updateCurrentUser } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useFamilyDataStore } from '@stores/FamilyDataStore'
import User from '@models/User'
import { useMutation } from '@tanstack/react-query'
import UserController from '@models/UserController'
import { useProfiledataStore } from '@stores/MyProfiledataStore'
import { useLoginDataStore } from '@stores/LoginDataStore'

type propTypes = {
  data: any
}

const ProfileFormInput = ({ data }: any) => {
  const toast = useToast()

  const { isEdit, setEdit } = useMyProfileStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setUser, profileUrl } = useProfiledataStore()
  const [userInfo, setUserInfo] = useState<any>(null)
  const selectOptions = {
    title: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'],
    sex: ['ชาย', 'หญิง'],
    subDistrict: ['ดาวคะนอง'],
    district: ['ธนบุรี'],
    province: ['กรุงเทพมหานคร'],
    postalCode: ['10600'],
  }
  //------------confirm password and call update api

  const updateUser = useMutation(
    (value: any) => {
      return UserController.editProfile(
        value.title,
        value.firstName,
        value.lastName,
        value.sex,
        value.phoneNumber,
        value.birthDate,
        value.profileURI,
        value.password
      )
    },
    {
      onSuccess: (data) => {
        toast({
          title: 'แก้ไขข้อมูลสำเร็จ',
          status: 'success',
          duration: 3000,
        })
        window.location.reload()
      },
      onError: (error) => {
        toast({
          title: 'แก้ไขข้อมูลไม่สำเร็จ',
          status: 'error',
          duration: 3000,
          description: `${error}`,
        })
      },
    }
  )

  //---------------handale values for wait to confirm password

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
              console.log(values)
              onClose()
            }}
            onSubmit={async (values) => {
              updateUser.mutate({ ...user, password: values.password })
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

              <ModalFooter justifyContent="flex-end">
                <ButtonGroup gap="10px">
                  <Button variant="outline" type="reset">
                    ยกเลิก
                  </Button>
                  <Button variant="solid" colorScheme="blue" type="submit">
                    ตกลง
                  </Button>
                </ButtonGroup>
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
          console.log({ ...values, profileURI: profileUrl })
          setUser({ ...values, profileURI: profileUrl })
          onOpen()
          //--------------------do something for handle value
          //----------next Open modal for confirm password
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
            {/* <Text as="b">ที่อยู่ตามทะเบียนบ้าน</Text>
            <Divider />
            <Flex gap="16px">
              <FormInput
                label="บ้านเลขที่"
                name="้houseNumber"
                type="text"
                placeholder="กรอกบ้านเลขที่"
                width="121px"
                disable={!isEdit}
              />
              <FormInput
                label="หมู่บ้าน"
                name="villageName"
                type="text"
                placeholder="กรอกหมู่บ้าน"
                width="213px"
                disable={!isEdit}
              />
              <FormInput
                label="หมู่ที่"
                name="swineNumber"
                type="text"
                placeholder="กรอกหมู่ที่"
                width="67px"
                disable={!isEdit}
              />
              <FormInput
                label="ตรอก"
                name="alley"
                type="text"
                placeholder="กรอกนามสกุล"
                width="160px"
                disable={!isEdit}
              />
            </Flex>
            <Flex gap="16px">
              <FormInput
                label="ซอย"
                name="lane"
                type="text"
                placeholder="กรอกซอย"
                width="153px"
                disable={!isEdit}
              />
              <FormInput
                label="ถนน"
                name="road"
                type="text"
                placeholder="กรอกถนน"
                width="232px"
                disable={!isEdit}
              />
              <FormInput
                label="ตำบล/แขวง"
                name="subDistrict"
                type="select"
                options={selectOptions.subDistrict}
                placeholder="กรอกตำบล/แขวง"
                width="192px"
                disable={!isEdit}
              />
            </Flex>
            <Flex gap="16px">
              <FormInput
                label="อำเภอ/เขต"
                name="district"
                type="select"
                options={selectOptions.district}
                placeholder="กรอกอำเภอ/เขต"
                width="209px"
                disable={!isEdit}
              />
              <FormInput
                label="จังหวัด"
                name="province"
                type="select"
                options={selectOptions.province}
                placeholder="กรอกจังหวัด"
                width="222px"
                disable={!isEdit}
              />
              <FormInput
                label="รหัสไปรษณีย์"
                name="postalCode"
                type="select"
                options={selectOptions.postalCode}
                placeholder="กรอกรหัสไปรษณีย์"
                width="146px"
                disable={!isEdit}
              />
            </Flex> */}
            <Box height="40px" textAlign="right" width="100%">
              <HStack
                gap="22px"
                justifyContent="flex-end"
                display={isEdit ? 'unset' : 'none'}
              >
                <Button variant="outline" type="reset">
                  ยกเลิก
                </Button>
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

/*const ProfileSchema = Yup.object().shape({
        title: Yup.mixed().oneOf(['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง']),
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
    */
