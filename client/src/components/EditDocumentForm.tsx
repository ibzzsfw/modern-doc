import {
  Box,
  Text,
  Heading,
  VStack,
  Progress,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Button,
  Flex,
} from '@chakra-ui/react'
import FormInput from '@components/FormInput'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import {PDFDocument, rgb} from 'pdf-lib'

type propTypes = {
  id?: string
  fields?: []
}


const EditDocumentForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const mockData = {
    id: '7aaba26a-8f38-452b-b6e7-6375106139ae',
    name: 'เอกสารกำจัดขนตูด',
    officialName: 'เอกสารกำจัดขนตูด',
    description:
      'ใช้ในการกำจัดขนตูดอย่างแยบยล&nbsp;  - กำจัดได้ง่ายไม่ระคายเคือง&nbsp;  - ขนตูดหายไปยาวนาน&nbsp;  > กำจัดขนตูดวันนี้ด้วยตัวคุณ',
    dayLifeSpan: 20,
    URI: 'http://www.songtham.ac.th/managefiles/file/alisa/pdffile.pdf',
    tags: [
      {
        id: '86e1d587-ccb4-4b78-ad02-f912e1d9e1f0',
        name: 'ผู้พิการ',
      },
    ],
    fields: [
      {
        name: 'personal_firstname',
        officialName: 'ชื่อจริง',
        description: 'ชื่อจริง',
        type: 'text',
      },
      {
        name: 'personal_phonenumber',
        officialName: 'หมายเลขโทรศัพท์',
        description: 'หมายเลขโทรศัพท์',
        type: 'text',
      },
      {
        name: 'personal_title',
        officialName: 'คำนำหน้า',
        description: 'คำนำหน้า',
        type: 'text',
      },
      {
        name: 'personal_citizenId',
        officialName: 'เลขบัตรประชาชน',
        description: 'เลขบัตรประชาชน',
        type: 'text',
      },
      {
        name: 'personal_birthdate',
        officialName: 'วันเกิด',
        description: 'วันเกิด',
        type: 'date',
      },
    ],
  }
  let layout = {
    width: '768px',
    height: '759px',
    backgroundColor: 'accent.white',
    borderRadius: '8px',
  }

  interface fieldTypes   {
    name: string
    officialName: string
    description: string
    type: string
  }

  const getSchema = (fields: fieldTypes[]) => {
    let schema = {}
    fields.forEach((field) => {
      if (field.type === 'text' || field.type === 'date') {
        schema[field.name] = Yup.string().required('จำเป็นต้องกรอก')
      } else {
        schema[field.name] = Yup.mixed()
      }
    })

    return Yup.object().shape(schema)
  }
  
  return (
    <Box sx={layout}>
      <VStack>
        <Heading>ข้อมูลที่จำเป็น</Heading>
        <Text>ข้อมูลเหล่านี้จะถูกนำไปบันทึกในเอกสารที่ระบบจะสร้างขึ้น</Text>
        <Formik
          initialValues={{
            personal_firstname: '',
            personal_phonenumber: '',
            personal_title: '',
            personal_citizenId: '',
            personal_birthdate: '',
          }}
          validationSchema={getSchema(mockData.fields)}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          <Form>
            {mockData.fields.map((field) => {
              console.log(getSchema(mockData.fields))
              return (
                <FormInput
                  label={field.officialName}
                  name={field.name}
                  type={field.type}
                  placeholder={`กรอก${field.officialName}`}
                  showCorrectBorder
                />
              )
            })}
            <Box width= '100%'>
            <Flex justifyContent= 'space-between' >
            <Box width="50%">
            <Progress value={60} />
          </Box>
          <Button rightIcon={<FiSearch />} onClick={onOpen}>
              ตรวจสอบ
            </Button>
 

            </Flex>
            </Box>
            
                     </Form>
        </Formik>
      </VStack>
      
       
          
          <>
            
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              closeOnOverlayClick={false}
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>ตรวจสอบความถูกต้อง</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <iframe id = 'pdf'></iframe>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        
      
    </Box>
  )
}

export default EditDocumentForm
