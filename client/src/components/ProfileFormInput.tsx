import {
  Box,
  HStack,
  VStack,
  Icon,
  Button,
  Flex,
  Divider,
  Heading,
  Text,
  Stack,
  ButtonGroup,
  Center,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import FormInput from '@components/FormInput'
import * as Yup from 'yup'
import { useState, useRef } from 'react'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { HiKey } from 'react-icons/hi'
import { FiEdit } from 'react-icons/fi'

const ProfileFormInput = () => {
  const [info, setInfo] = useState({
    prefix: 'เด็กชาย',
    firstName: 'ใจฟู',
    lastName: 'ศิลาคงกะพัน',
    sex: 'ชาย',
    birthDate: '21/12/2005',
    citizenId: '5 6684 33592 45 1',
    phoneNumber: '0812345678',
    email: 'jaifu.dudee@gmail.com',
    password: 'test555',
    houseNumber: '285/285',
    villageName: 'ภักดีชินรัตนา',
    swineNumber: '2',
    alley: 'เริงรัตน์ 5',
    lane: 'ภักดี 2',
    road: 'สมเด็จพระเจ้าตากสิน',
    subDistrict: 'ดาวคะนอง',
    district: 'ธนบุรี',
    province: 'กรุงเทพมหานคร',
    postalCode: '10600',
  })
  const [editProfile, seteditProfile] = useState(true)

  const selectOptions = {
    prefix: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'],
    sex: ['ชาย', 'หญิง'],
    subDistrict: ['ดาวคะนอง'],
    district: ['ธนบุรี'],
    province: ['กรุงเทพมหานคร'],
    postalCode: ['10600'],
  }

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
    height: '40px',
    backgroundColor: 'accent.blue',
    color: 'white',
    margin: 'auto',
    variant: 'outline',
    _hover: {
      backgroundColor: 'hover.blue',
    },
    _active: {
      backgroundColor: 'hover.white',
    },
  }

  let editButton = {
    width: 'auto',
    height: '40px',
    backgroundColor: 'accent.white',
    color: 'black',
    right: '0px',
    variant: 'outline',
    border: '1px solid',
    borderColor: '#E2E8F0',

    _hover: {
      backgroundColor: 'hover.gray',
      color: 'white',
    },
    _active: {
      backgroundColor: 'hover.white',
    },
  }

  /*const ProfileSchema = Yup.object().shape({
        prefix: Yup.mixed().oneOf(info.prefix),
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
  return (
    <VStack>
      <Box width="100%" textAlign="right">
        <Button
          sx={editButton}
          display={editProfile ? 'unset' : 'none'}
          leftIcon={<FiEdit />}
          onClick={() => {
            seteditProfile(false)
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
        initialValues={info}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <Form>
          <VStack align="flex-start">
            <FormInput
              label="เลขบัตรประจำตัวประชาชน"
              name="citicenId"
              type="text"
              placeholder={info.citizenId}
              showCorrectBorder
              width="208px"
              disable
            />
            <Flex gap="16px">
              <FormInput
                label="คำนำหน้า"
                name="prefix"
                type="select"
                options={selectOptions.prefix}
                placeholder={info.prefix}
                showCorrectBorder
                width="143px"
                disable={editProfile}
              />
              <FormInput
                label="ชื่อ"
                name="firstName"
                type="text"
                placeholder="กรอกชื่อไม่ต้องระบุคำนำหน้า"
                showCorrectBorder
                width="208px"
                disable={editProfile}
              />
              <FormInput
                label="นามสกุล"
                name="lastName"
                type="text"
                placeholder="กรอกนามสกุล"
                showCorrectBorder
                width="226px"
                disable={editProfile}
              />
            </Flex>
            <Flex gap="16px">
              <FormInput
                label="เพศ"
                name="sex"
                type="select"
                placeholder="--เลือกเพศ--"
                options={selectOptions.sex}
                showCorrectBorder
                width="111px"
                disable={editProfile}
              />
              <FormInput
                label="วัน/เดือน/ปีเกิด"
                name="birthDate"
                type="date"
                placeholder="XX/XX/XXXX"
                showCorrectBorder
                width="214px"
                disable={editProfile}
              />
              <FormInput
                label="หมายเลขโทรศัพท์"
                name="phoneNumber"
                type="text"
                placeholder="08XXXXXXXX"
                showCorrectBorder
                width="252px"
                disable={editProfile}
              />
            </Flex>

            <Flex gap="16px" alignItems="flex-end">
              <FormInput
                label="E-mail ที่ใช้ในการสมัคร"
                name="email"
                type="email"
                placeholder="example@moderndoc.angel.com"
                showCorrectBorder
                width="238px"
                disable={editProfile}
              />
              <Button
                variant="outline"
                width="240px"
                leftIcon={<HiKey />}
                marginBottom="24px"
                display={editProfile ? 'unset' : 'none'}
              >
                เปลี่ยนรหัสผ่าน
              </Button>
            </Flex>
            <Text as="b">ที่อยู่ตามทะเบียนบ้าน</Text>
            <Divider />
            <Flex gap="16px">
              <FormInput
                label="บ้านเลขที่"
                name="้houseNumber"
                type="text"
                placeholder="กรอกบ้านเลขที่"
                showCorrectBorder
                width="121px"
                disable={editProfile}
              />
              <FormInput
                label="หมู่บ้าน"
                name="villageName"
                type="text"
                placeholder="กรอกหมู่บ้าน"
                showCorrectBorder
                width="213px"
                disable={editProfile}
              />
              <FormInput
                label="หมู่ที่"
                name="swineNumber"
                type="text"
                placeholder="กรอกหมู่ที่"
                showCorrectBorder
                width="67px"
                disable={editProfile}
              />
              <FormInput
                label="ตรอก"
                name="alley"
                type="text"
                placeholder="กรอกนามสกุล"
                showCorrectBorder
                width="160px"
                disable={editProfile}
              />
            </Flex>
            <Flex gap="16px">
              <FormInput
                label="ซอย"
                name="lane"
                type="text"
                placeholder="กรอกซอย"
                showCorrectBorder
                width="153px"
                disable={editProfile}
              />
              <FormInput
                label="ถนน"
                name="road"
                type="text"
                placeholder="กรอกถนน"
                showCorrectBorder
                width="232px"
                disable={editProfile}
              />
              <FormInput
                label="ตำบล/แขวง"
                name="subDistrict"
                type="select"
                options={selectOptions.subDistrict}
                placeholder="กรอกตำบล/แขวง"
                showCorrectBorder
                width="192px"
                disable={editProfile}
              />
            </Flex>
            <Flex gap="16px">
              <FormInput
                label="อำเภอ/เขต"
                name="district"
                type="select"
                options={selectOptions.district}
                placeholder="กรอกอำเภอ/เขต"
                showCorrectBorder
                width="209px"
                disable={editProfile}
              />
              <FormInput
                label="จังหวัด"
                name="province"
                type="select"
                options={selectOptions.province}
                placeholder="กรอกจังหวัด"
                showCorrectBorder
                width="222px"
                disable={editProfile}
              />
              <FormInput
                label="รหัสไปรษณีย์"
                name="postalCode"
                type="select"
                options={selectOptions.postalCode}
                placeholder="กรอกรหัสไปรษณีย์"
                showCorrectBorder
                width="146px"
                disable={editProfile}
              />
            </Flex>
            <Flex justify= 'center' width='100%' >
               
                <Flex gap= '22px'>
                <Button
                  display={!editProfile ? 'unset' : 'none'}
                  onClick={() => {
                    seteditProfile(true)
                  }}
                >
                  ยกเลิก
                </Button>
                <Button
                  display={!editProfile ? 'unset' : 'none'}
                  sx={submitButton}
                >
                  ตกลง
                </Button>
     
                </Flex>
                              
                
            </Flex>
          </VStack>
        </Form>
      </Formik>
    </VStack>
  )
}

export default ProfileFormInput
