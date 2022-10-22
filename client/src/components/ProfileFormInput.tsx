import {
   Box,
  } from '@chakra-ui/react'
  import {  Form, Formik } from 'formik'
  import FormInput from '@components/FormInput'
  import * as Yup from 'yup'
 import { useState } from 'react'

const ProfileFormInput = () => {
    
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


      const ProfileSchema = Yup.object().shape({
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
        
            <Formik>
                <Form>
            <FormInput
                label="ชื่อ"
                name="firstName"
                type="text"
                placeholder="กรอกชื่อไม่ต้องระบุคำนำหน้า"
                showCorrectBorder
              />
                </Form>
            </Formik>
              
                

    
    )
}

export default ProfileFormInput