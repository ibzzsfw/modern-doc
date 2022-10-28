import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormInput from '@/components/FormInput'
import { useState } from 'react'
import { Flex, VStack, Box, Icon } from '@chakra-ui/react'

type propsType = {
  prefix?: 'นาย'
  firstName?: 'ใจเกเร'
  lastName?: 'ศิลาคงกะพัน'
  relationship?: 'พี่'
  citizenId?: '5 4488 45235 01 9'
  menu?: any
}

const FamilyInputform = ({ data, menu }: propsType) => {
  const [memberInfo, setmemberInfo] = useState({
    prefix: 'นาย',
    firstName: 'ใจเกเร',
    lastName: 'ศิลาคงกะพัน',
    relationship: 'พี่',
    citizenId: '5 4488 45235 01 9',
  })

  const [editProfile, seteditProfile] = useState(true)
  const selectOptions = {
    prefix: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'],
    relationship: ['บิดา', 'มารดา', 'พี่', 'น้อง', 'อื่นๆ'],
  }

  return (
    <VStack>
      <Box textAlign="end" width="100%">
        {menu}
      </Box>

      <Formik
        initialValues={memberInfo}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <Form>
          <VStack alignItems="flex-start">
            <Flex gap="16px">
              <FormInput
                label="คำนำหน้า"
                name="prefix"
                type="select"
                options={selectOptions.prefix}
                placeholder={memberInfo.prefix}
                showCorrectBorder
                width="139.2px"
                disable={editProfile}
              />
              <FormInput
                label="ชื่อ"
                name="firstName"
                type="text"
                placeholder="กรอกชื่อไม่ต้องระบุคำนำหน้า"
                showCorrectBorder
                width="219.08px"
                disable={editProfile}
              />
              <FormInput
                label="นามสกุล"
                name="lastName"
                type="text"
                placeholder="กรอกนามสกุล"
                showCorrectBorder
                width="238.45px"
                disable={editProfile}
              />
            </Flex>
            <Flex gap="16px">
              <FormInput
                label="เกี่ยวข้องเป็น"
                name="relation"
                type="select"
                options={selectOptions.relationship}
                placeholder={memberInfo.relationship}
                showCorrectBorder
                width="159px"
                disable={editProfile}
              />
              <FormInput
                label="เลขบัตรประจำตัวประชาชน"
                name="citicenId"
                type="text"
                placeholder={memberInfo.citizenId}
                showCorrectBorder
                width="280.81"
                disable
              />
            </Flex>
          </VStack>
        </Form>
      </Formik>
    </VStack>
  )
}

export default FamilyInputform
