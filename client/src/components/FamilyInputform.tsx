import { Box, Button, Flex, VStack } from '@chakra-ui/react'
import FormInput from '@components/FormInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

type propsType = {
  menu?: JSX.Element
  disable?: boolean
  citizenIdDisable?: boolean,
  formikintialValues: any
  closeBTN?: () => void
  modal?: any
  APIaction?: (values:any) => any
}

const FamilyInputform = ({
  menu,
  disable,
  citizenIdDisable,
  closeBTN,
  modal,
  formikintialValues,
  APIaction
}: propsType) => {

 

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
      .oneOf([
        'บิดา',
        'มารดา',
        'พี่',
        'น้อง',
        'อื่นๆ',
        'เจ้าของบ้าน',
        'ผู้อาศัย'
      ])
      .required('กรุณาเลือกความสัมพันธ์'),
    citizenId: Yup.string().required('กรุณากรอกเลขบัตรประชาชน'),
    title: Yup.mixed().oneOf(['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง']).required('กรุณาเลือกคำนำหน้า'),
  })

  return (
    <VStack>
      <Box textAlign="end" width="100%">
        {menu}
      </Box>

      <Formik
        initialValues={formikintialValues}
        validationSchema={familyschema}
        onSubmit={(values) => {
          console.log(values)
          if(APIaction) APIaction(values)
          if(closeBTN) closeBTN()
        }}
      >
        <Form>
          <VStack alignItems="start">
            <Flex gap="16px">
              <FormInput
                label="คำนำหน้า"
                name="title"
                type="select"
                options={['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง']}
                placeholder="เลือกคำนำหน้า"
                
                width="139.2px"
                disable={disable}
              />
              <FormInput
                label="ชื่อ"
                name="firstName"
                type="text"
                placeholder="กรอกชื่อ"
                
                width="219.08px"
                disable={disable}
              />
              <FormInput
                label="นามสกุล"
                name="lastName"
                type="text"
                placeholder="กรอกนามสกุล"
                
                width="238.45px"
                disable={disable}
              />
            </Flex>
            <Flex gap="16px">
              <FormInput
                label="เกี่ยวข้องเป็น"
                name="relationship"
                type="select"
                options={[
                  'บิดา',
                  'มารดา',
                  'พี่',
                  'น้อง',
                  'อื่นๆ',
                  'เจ้าของบ้าน',
                  'ผู้อาศัย'
                ]}
                placeholder="เลือกความเกี่ยวข้อง"
                
                width="120px"
                disable={disable}
              />
              <FormInput
                label="เลขบัตรประจำตัวประชาชน"
                name="citizenId"
                type="text"
                placeholder="กรอกเลขบัตรประจำตัวประชาชน"
                
                width="250px"
                disable={citizenIdDisable}
              />
            </Flex>
            {disable ? (
              <></>
            ) : (
              <Flex justifyContent='flex-end' alignItems='center' columnGap='1rem' width="100%">
                <Button
                  onClick={() => {
                    if (closeBTN) closeBTN()
                  }}
                >
                  ยกเลิก
                </Button>
                <Button sx={submitButton} type="submit">
                  ตกลง
                </Button>
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
