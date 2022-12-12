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
} from '@chakra-ui/react'
import ChangePassword from '@components/ChangePassword.component.'
import FormInput from '@components/FormInput.component'
import UserType from '@view-models/UserType'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { useMyProfileStore } from '@models/MyProfilePageStore.model'
import { updateCurrentUser } from 'firebase/auth'
import { useEffect } from 'react'
import { useFamilyDataStore } from '@models/FamilyDataStore.model'
import User from '@view-models/User'
import { useMutation } from '@tanstack/react-query'
import UserController from '@view-models/UserController'
import { useProfiledataStore } from '@models/MyProfiledataStore.model'

type propTypes = {
  data: any
}

const ProfileFormInput = ({ data }: any) => {
  const toast = useToast()

  const { isEdit, setEdit } = useMyProfileStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setUser } = useProfiledataStore()

  const selectOptions = {
    title: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'],
    sex: ['ชาย', 'หญิง'],
    subDistrict: ['ดาวคะนอง'],
    district: ['ธนบุรี'],
    province: ['กรุงเทพมหานคร'],
    postalCode: ['10600'],
  }
  //------------confirm password and call update api
  const handleform = (values: any) => {
    setUser({...user, ...values})
    console.log(user)
  }
  const updateUser = useMutation((value : any) => {return UserController.editProfile(value.title, value.firstName, value.lastName,value.sex,
    value.phoneNumber,value.birthDate,value.profileURI,value.password)},{
      onSuccess: (data) => {},
      onError: (error) => {},
    })
    const confirmPassword = useMutation((value : {phoneNumber : string,password : string})=>{
      return UserController.checkPhonePassword(value)
    },{
      onSuccess: (data) => {return true},
      onError: (error) => {return false},
    })
  //---------------handale values for wait to confirm password
  const updateProfile = (values: any) => {}

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
            onSubmit={(values, actions) => {
             
               if(confirmPassword.mutate({phoneNumber : user.phoneNumber,password : values.password})){
                updateUser.mutate()
               }else{
                console.log("pass ผิด")
               }

              
             
              
              
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
          //console.log(values)
          //--------------------do something for handle value
          //----------next Open modal for confirm password
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
