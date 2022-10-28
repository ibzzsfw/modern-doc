import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormInput from '@/components/FormInput'
import { useState } from 'react'
import {
  Flex,
  VStack,
  Box,
  Icon,
  Button,
  Link,
  useToast,
} from '@chakra-ui/react'

type propsType = {
  id?: number
  prefix?: string
  firstName?: string
  lastName?: string
  relationship?: string
  citizenId?: string
  menu?: any
  disable?: boolean | 'false' | 'true'
  citizenIdDisable?: boolean | 'false' | 'true'
  closeForm?: () => void
  toast?: any
}

const FamilyInputform = ({
  id,
  prefix,
  firstName,
  lastName,
  relationship,
  citizenId,
  menu,
  disable,
  closeForm,
  citizenIdDisable,
  toast,
}: propsType) => {
  const selectOptions = {
    prefix: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'],
    relationship: ['บิดา', 'มารดา', 'พี่', 'น้อง', 'อื่นๆ'],
  }

 

  const initToast = useToast()
  let submitButton = {
    height: '40px',
    backgroundColor: 'accent.blue',
    color: 'white',

    variant: 'outline',
    _hover: {
      backgroundColor: 'hover.blue',
    },
    _active: {
      backgroundColor: 'hover.white',
    },
  }
  
    
  

  return (
    <VStack>
      <Box textAlign="end" width="100%">
        {menu}
      </Box>

      <Formik
        initialValues={{
          prefix: prefix || '',
          firstName: firstName || '',
          lastName: lastName || '',
          relationship: relationship || '',
          citizenId: citizenId || '',
        }}
        onSubmit={(values) => {
        }}
      >
        <Form>
          <VStack alignItems="start">
            <Flex gap="16px">
              <FormInput
                label="คำนำหน้า"
                name="prefix"
                type="select"
                options={selectOptions.prefix}
                placeholder="เลือกคำนำหน้า"
                showCorrectBorder
                width="139.2px"
                disable={!disable}
              />
              <FormInput
                label="ชื่อ"
                name="firstName"
                type="text"
                placeholder="กรอกชื่อ"
                showCorrectBorder
                width="219.08px"
                disable={!disable}
              />
              <FormInput
                label="นามสกุล"
                name="lastName"
                type="text"
                placeholder="กรอกนามสกุล"
                showCorrectBorder
                width="238.45px"
                disable={!disable}
              />
            </Flex>
            <Flex gap="16px">
              <FormInput
                label="เกี่ยวข้องเป็น"
                name="relationship"
                type="select"
                options={selectOptions.relationship}
                placeholder="เลือกความเกี่ยวข้อง"
                showCorrectBorder
                width="120px"
                disable={!disable}
              />
              <FormInput
                label="เลขบัตรประจำตัวประชาชน"
                name="citicenId"
                type="text"
                placeholder="กรอกเลขบัตรประจำตัวประชาชน"
                showCorrectBorder
                width="250px"
                disable={!citizenIdDisable}
              />
            </Flex>
            {!disable ? (
              <></>
            ) : (
              <Flex justify="center" width="100%">
                <Flex gap="22px" align="center">
                  <Button
                    onClick={() => {
                      closeForm()
                    }}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    sx={submitButton}
                    onClick={() => {
                      initToast(toast)
                      closeForm()
                    }}
                  >
                    ตกลง
                  </Button>
                </Flex>
              </Flex>
            )}
          </VStack>
        </Form>
      </Formik>
    </VStack>
  )
}

export default FamilyInputform
