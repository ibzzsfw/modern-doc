import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import FormInput from '@components/FormInput.component'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import * as Yup from 'yup'

type propTypes = {
  id?: string
  fields?: []
}

const EditDocumentForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [page, setPage] = useState(0)
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
      {
        name: 'personal_sex',
        officialName: 'เพศ',
        description: 'เพศ',
        type: 'select',
      },
      {
        name: 'personal_address',
        officialName: 'ที่อยู่',
        description: 'ที่อยู่',
        type: 'select',
      },
    ],
  }
  let layout = {
    width: '768px',
    height: '759px',
    backgroundColor: 'accent.white',
    borderRadius: '8px',
  }

  let submitButton = {
    width: '102px',
    height: '40px',
    backgroundColor: 'accent.green',
    color: 'white',
    margin: 'auto',
    _hover: {
      backgroundColor: 'hover.darkgreen',
    },
    _active: {
      backgroundColor: 'hover.green',
    },
  }
  interface fieldTypes {
    name: string
    officialName: string
    description: string
    type: string
  }
  const assignPage = (fields: {}[]) => {
    let fieldPerPage = []
    for (let page = 0; page < Math.ceil(fields.length / 6); page++) {
      fieldPerPage.push(fields.slice(page * 6, (page + 1) * 6))
    }
    return fieldPerPage
  }

  const getSchema = (fields: fieldTypes[]) => {
    let schema: any = {}
    let fieldName: any = {}
    fields.forEach((field) => {
      if (field.type === 'text' || field.type === 'date') {
        schema[field.name] = Yup.string().required('จำเป็นต้องกรอก')
        fieldName[field.name] = ''
      } else {
        schema[field.name] = Yup.mixed().required('จำเป็นต้องเลือก')
        fieldName[field.name] = ''
      }
    })
    console.log(fieldName)
    console.log(assignPage(mockData.fields))

    return [Yup.object().shape(schema), fieldName]
  }

  let checkedModal = (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ตรวจสอบความถูกต้องของข้อมูล</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Tabs>
              <Formik
                initialValues={getSchema(mockData.fields)[1]}
                validationSchema={getSchema(mockData.fields)[0]}
                onSubmit={(values) => {
                  console.log(values)
                }}
              >
                <Form>
                  <VStack>
                    <>
                      <VStack alignItems="start" alignSelf="center" width="80%">
                        <Box h="616px">
                          <TabPanels>
                            {assignPage(mockData.fields).map(
                              (page, pageIndex) => {
                                return (
                                  <TabPanel key={pageIndex}>
                                    {page.map((field) => {
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
                                  </TabPanel>
                                )
                              }
                            )}
                          </TabPanels>
                        </Box>
                      </VStack>
                    </>
                    <TabList>
                      {assignPage(mockData.fields).map((page, index) => {
                        return <Tab key={index}>{index}</Tab>
                      })}
                    </TabList>
                  </VStack>
                </Form>
              </Formik>
            </Tabs>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button variant="solid" colorScheme="blue" onClick={() => { }}>
            ตกลง
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  return (
    <Center>
      <Tabs>
        <Formik
          initialValues={getSchema(mockData.fields)[1]}
          validationSchema={getSchema(mockData.fields)[0]}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          <Form>
            <VStack>
              <Flex sx={layout} justify="space-evenly">
                <VStack alignItems="start" alignSelf="center" width="80%">
                  <Heading>ข้อมูลที่จำเป็น</Heading>
                  <Text>
                    ข้อมูลเหล่านี้จะถูกนำไปบันทึกในเอกสารที่ระบบจะสร้างขึ้น
                  </Text>
                  <Box h="616px">
                    <TabPanels>
                      {assignPage(mockData.fields).map((page, pageIndex) => {
                        return (
                          <TabPanel key={pageIndex}>
                            {page.map((field) => {
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
                          </TabPanel>
                        )
                      })}
                    </TabPanels>
                  </Box>
                </VStack>
              </Flex>
              <TabList>
                {assignPage(mockData.fields).map((page, index) => {
                  return <Tab key={index}>{index}</Tab>
                })}
              </TabList>
              <Box width="100%">
                <Flex justifyContent="space-between">
                  <Box width="50%">
                    <Progress value={60} />
                  </Box>
                  <Button
                    sx={submitButton}
                    rightIcon={<FiSearch />}
                    onClick={onOpen}
                  >
                    ตรวจสอบ
                  </Button>
                </Flex>
              </Box>
            </VStack>
          </Form>
        </Formik>
      </Tabs>
      {checkedModal}
    </Center>
  )
}

export default EditDocumentForm

/**
 * 
 * assignPage(getSchema(mockData.fields)[1]).map((fieldPerPage)=>{
  return(
    
  )
})
 *  <Center>
      <Flex sx={layout} justify="space-evenly">
        <VStack alignItems="start" alignSelf="center" width="80%">
          <Heading>ข้อมูลที่จำเป็น</Heading>
          <Text>ข้อมูลเหล่านี้จะถูกนำไปบันทึกในเอกสารที่ระบบจะสร้างขึ้น</Text>
          <Formik
            initialValues={getSchema(mockData.fields)[1]}
            validationSchema={getSchema(mockData.fields)[0]}
            onSubmit={(values) => {
              console.log(values)
              
            }}
          >
          
            <Form>
              {mockData.fields.map((field) => {
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
              <ModalBody></ModalBody>

              <ModalFooter>
                <Button>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </Flex>
    </Center>
  */

/**return page.map((field) => {
                        if (pageIndex == 0)
                          return (
                            <>
                              {console.log()}
                              <FormInput
                                label={field.officialName}
                                name={field.name}
                                type={field.type}
                                placeholder={`กรอก${field.officialName}`}
                                showCorrectBorder
                              />
                            </>
                          )
                      }) */
