import { Box, Button, Flex, useToast, VStack } from '@chakra-ui/react'
import FormInput from '@components/FormInput'
import { useFamilyPageStore } from '@stores/FamilyPageStore'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

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
  callBack?: () => void
  toastDiscription?: any
  modal?: any
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

  citizenIdDisable,
  toastDiscription,
  callBack,
  modal,
}: propsType) => {
  const { prefix: optionPrefix, relationship: optionrelationship } =
    useFamilyPageStore()

  const toast = useToast()

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

  const familyschema = Yup.object().shape({
    id: Yup.string(),
    firstName: Yup.string().required('กรุณากรอกชื่อ'),
    lastName: Yup.string().required('กรุณากรอกนามสกุล'),
    relationship: Yup.mixed()
      .oneOf(optionrelationship)
      .required('กรุณาเลือกความสัมพันธ์'),
    citizenId: Yup.string().required('กรุณากรอกเลขบัตรประชาชน'),
    prefix: Yup.mixed().oneOf(optionPrefix).required('กรุณาเลือกคำนำหน้า'),
  })

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
        validationSchema={familyschema}
        onSubmit={(values) => {
          toast(toastDiscription)
        }}
      >
        <Form>
          <VStack alignItems="start">
            <Flex gap="16px">
              <FormInput
                label="คำนำหน้า"
                name="prefix"
                type="select"
                options={optionPrefix}
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
                options={optionrelationship}
                placeholder="เลือกความเกี่ยวข้อง"
                showCorrectBorder
                width="120px"
                disable={!disable}
              />
              <FormInput
                label="เลขบัตรประจำตัวประชาชน"
                name="citizenId"
                type="text"
                placeholder="กรอกเลขบัตรประจำตัวประชาชน"
                showCorrectBorder
                width="250px"
                disable={citizenIdDisable}
              />
            </Flex>
            {!disable ? (
              <></>
            ) : (
              <Flex justify="center" width="100%">
                <Flex gap="22px" align="center">
                  <Button
                    onClick={() => {
                      callBack()
                    }}
                  >
                    ยกเลิก
                  </Button>
                  <Button sx={submitButton} type="submit">
                    ตกลง
                  </Button>
                </Flex>
              </Flex>
            )}
          </VStack>
        </Form>
      </Formik>
      {modal}
    </VStack>
  )
}

export default FamilyInputform
