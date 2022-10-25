import {
   Box, HStack, VStack,Icon,Button, Flex,Divider,Heading,Text
  } from '@chakra-ui/react'
  import {  Form, Formik } from 'formik'
  import FormInput from '@components/FormInput'
  import * as Yup from 'yup'
 import { useState } from 'react'
 import {AiTwotoneCalendar} from 'react-icons/ai'
 import {HiKey} from 'react-icons/hi'

const ProfileFormInput = () => {
    const [info,setInfo] = useState({
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
    });

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
        variant : 'outline',
        _hover: {
          backgroundColor: 'hover.blue',
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
            <Box>
                
                <Formik initialValues= {info}
                onSubmit={(values) => {
                    console.log(values)
                  }}>
                    <Form>
                        <VStack alignItems='flex-start'>
                            <HStack gap = '16px'>
                            <FormInput
                                label="คำนำหน้า"
                                name="prefix"
                                type="select"
                                options={selectOptions.prefix}
                                placeholder= {info.prefix}
                                showCorrectBorder
                                width='143px'
                             />
                            <FormInput
                                label="ชื่อ"
                                name="firstName"
                                type="text"
                                placeholder="กรอกชื่อไม่ต้องระบุคำนำหน้า"
                                showCorrectBorder
                                width='204px'
                            />
                            <FormInput
                                label="นามสกุล"
                                name="lastName"
                                type="text"
                                placeholder="กรอกนามสกุล"
                                showCorrectBorder
                                width='221px'
                            /> 
                            </HStack>
                            <HStack gap = '16px'>
                            <FormInput
                                label="เพศ"
                                name="sex"
                                type="select"
                                placeholder="--เลือกเพศ--"
                                options={selectOptions.sex}
                                showCorrectBorder
                                width='111px'
                            />
                            <FormInput
                                label="วัน/เดือน/ปีเกิด"
                                name="birthDate"
                                type="date"
                                placeholder="XX/XX/XXXX"
                                
                                showCorrectBorder
                                width='214px'
                            />
                            <FormInput
                                label="หมายเลขโทรศัพท์"
                                name="phoneNumber"
                                type="text"
                                placeholder="08XXXXXXXX"
                                showCorrectBorder
                                width='243px'
                            />
                                
                            </HStack>
                            
                            <HStack gap='16px' alignContent='flex-end'>
                            <FormInput
                                label="E-mail ที่ใช้ในการสมัคร"
                                name="email"
                                type="email"
                                placeholder="example@moderndoc.angel.com"
                                showCorrectBorder
                                width='238px'
                            />
                                <Box marginTop= ''>
                                <Button variant='outline' width= '158px'
                                leftIcon={<HiKey />}
                            >
                            เปลี่ยนรหัสผ่าน</Button>
                            
                                    
                                </Box>
                             
                                
                            </HStack>
                            <Text  as = 'b'>ที่อยู่ตามทะเบียนบ้าน</Text>
                            <Divider/>
                            <HStack gap='16px'>
                            <FormInput
                                label="บ้านเลขที่"
                                name="้houseNumber"
                                type="text"
                                placeholder="กรอกบ้านเลขที่"
                                showCorrectBorder
                                width='121px'
                            /> 
                             <FormInput
                                label="หมู่บ้าน"
                                name="villageName"
                                type="text"
                                placeholder="กรอกหมู่บ้าน"
                                showCorrectBorder
                                width='213px'
                            /> 
                             <FormInput
                                label="หมู่ที่"
                                name="swineNumber"
                                type="text"
                                placeholder="กรอกหมู่ที่"
                                showCorrectBorder
                                width='67px'
                            /> 
                             <FormInput
                                label="ตรอก"
                                name="alley"
                                type="text"
                                placeholder="กรอกนามสกุล"
                                showCorrectBorder
                                width='160px'
                            /> 
                                
                            </HStack>
                            <HStack gap='16px'>
                            <FormInput
                                label="ซอย"
                                name="lane"
                                type="text"
                                placeholder="กรอกซอย"
                                showCorrectBorder
                                width='153px'
                            /> 
                            <FormInput
                                label="ถนน"
                                name="road"
                                type="text"
                                placeholder="กรอกถนน"
                                showCorrectBorder
                                width='232px'
                            /> 
                            <FormInput
                                label="ตำบล/แขวง"
                                name="subDistrict"
                                type="select"
                                options={selectOptions.subDistrict}
                                placeholder="กรอกตำบล/แขวง"
                                showCorrectBorder
                                width='192px'
                            /> 
                                
                            </HStack>
                            <HStack gap='16px'>
                            <FormInput
                                label="อำเภอ/เขต"
                                name="district"
                                type="select"
                                options={selectOptions.district}
                                placeholder="กรอกอำเภอ/เขต"
                                showCorrectBorder
                                width='209px'
                            /> 
                            <FormInput
                                label="จังหวัด"
                                name="province"
                                type="select"
                                options={selectOptions.province}
                                placeholder="กรอกจังหวัด"
                                showCorrectBorder
                                width='222px'
                            /> 
                            <FormInput
                                label="รหัสไปรษณีย์"
                                name="postalCode"
                                type="select"
                                options={selectOptions.postalCode}
                                placeholder="กรอกรหัสไปรษณีย์"
                                showCorrectBorder
                                width='146px'
                            /> 
                                
                            </HStack>
                        </VStack>
                         
                    </Form>



                
            </Formik>

            </Box>
            
              
                

    
    )
}

export default ProfileFormInput