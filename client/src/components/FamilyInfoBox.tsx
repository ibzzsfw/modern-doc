import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import FormInput from '@components/FormInput'
import MenuProvider from '@components/MenuProvider'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import * as Yup from 'yup'

type propsType = {
  data?: any
  isAdd: boolean
  onCancelButtonClick?: () => void
  getId?: (id: string) => void
  disabled?: boolean
}

const FamilyInfoBox = ({
  data,
  isAdd,
  onCancelButtonClick,
  getId,
  disabled,
}: propsType) => {
  const [isEdit, setEdit] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  //------------api---------
  const addFamily = async (values:any) => {
    console.log('add')
  }
  const editFamily = async (values:any) => {
    console.log('edit')
  }
  const deleteFamily = async (values:any) => {
    console.log('delete')
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
        'ผู้อาศัย',
      ])
      .required('กรุณาเลือกความสัมพันธ์'),
    citizenId: Yup.string().required('กรุณากรอกเลขบัตรประชาชน'),
    title: Yup.mixed()
      .oneOf(['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'])
      .required('กรุณาเลือกคำนำหน้า'),
  })

  let menu = (
    <MenuProvider
      left="690px"
      top="36px"
      menusList={[
        [
          {
            title: 'แก้ไขข้อมูลสมาชิก',
            icon: <Icon as={BiEdit} />,
            onClick: () => {
              if (!disabled) {
                console.log(`edit ${data?.firstName + ' ' + data?.lastName}`)
                if(getId) getId(data?.id)
                setEdit(true)
              }
            },
          },
        ],
        [
          {
            title: 'ลบสมาชิก',
            icon: <Icon as={BsTrash} color="accent.red" />,
            onClick: () => {
              console.log(`delete ${data?.firstName + ' ' + data?.lastName}`)
              onOpen() // open delete modal
            },
            style: {
              color: 'accent.red',
            },
          },
        ],
      ]}
    >
      <Icon as={BsThreeDots} sx={threeDot} boxSize="18px" />
    </MenuProvider>
  )

  let deleteModal = (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ลบสมาชิก</ModalHeader>
        <ModalBody>
          คุณต้องการลบสมาชิก{' '}
          <Text as="b">{data?.firstName + ' ' + data?.lastName}</Text>{' '}
          ใช่หรือไม่
          <br />
          (เอกสารร่วมจะหายไปด้วย)
        </ModalBody>
        <ModalFooter>
          <Flex gap="22px">
            <Button variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={() => {
                //delete api
                deleteFamily()
                toast({
                  title: 'ลบสมาชิกสำเร็จ',
                  description: `ลบสมาชิก ${
                    data?.firstName + ' ' + data?.lastName
                  } สำเร็จ`,
                  status: 'success',
                  duration: 3000,
                })
                onClose()
              }}
            >
              ลบ
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  const addFamilySuccess = {
    title: 'เพิ่มสมาชิกสำเร็จ',
    status: 'success',
    duration: 3000,
  }

  let editFamilySuccess = {
    title: 'แก้ไขข้อมูลสมาชิกสำเร็จ',
    status: 'success',
    duration: 3000,
  }

  return (
    <Box sx={boxLayout}>
      <Flex height="100%">
        <HStack gap="32px">
          <Image
            src="https://bit.ly/sage-adebayo"
            boxSize="206px"
            borderRadius="8px"
          />
          {isAdd ? (
            <VStack>
              <Box textAlign="end" width="100%"></Box>

              <Formik
                initialValues={{}}
                validationSchema={familyschema}
                onSubmit={(values) => {
                  console.log(values)
                  addFamily(values)
                }}
              >
                <Form>
                  <VStack alignItems="start">
                    <Flex gap="16px">
                      <FormInput
                        label="คำนำหน้า"
                        name="title"
                        type="select"
                        options={[
                          'นาย',
                          'นาง',
                          'นางสาว',
                          'เด็กชาย',
                          'เด็กหญิง',
                        ]}
                        placeholder="เลือกคำนำหน้า"
                        width="139.2px"
                        disable={!isAdd}
                      />
                      <FormInput
                        label="ชื่อ"
                        name="firstName"
                        type="text"
                        placeholder="กรอกชื่อ"
                        width="219.08px"
                        disable={!isAdd}
                      />
                      <FormInput
                        label="นามสกุล"
                        name="lastName"
                        type="text"
                        placeholder="กรอกนามสกุล"
                        width="238.45px"
                        disable={!isAdd}
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
                          'ผู้อาศัย',
                        ]}
                        placeholder="เลือกความเกี่ยวข้อง"
                        width="120px"
                        disable={!isAdd}
                      />
                      <FormInput
                        label="เลขบัตรประจำตัวประชาชน"
                        name="citizenId"
                        type="text"
                        placeholder="กรอกเลขบัตรประจำตัวประชาชน"
                        width="250px"
                        disable={!isAdd}
                      />
                    </Flex>
                    {isAdd && (
                      <Flex
                        justifyContent="flex-end"
                        alignItems="center"
                        columnGap="1rem"
                        width="100%"
                      >
                        <Button
                          onClick={() => {
                            if (onCancelButtonClick) onCancelButtonClick()
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
              {deleteModal}
            </VStack>
          ) : (
            <VStack>
              <Box textAlign="end" width="100%">
                {menu}
              </Box>

              <Formik
                initialValues={data}
                validationSchema={familyschema}
                onSubmit={(values) => {
                  console.log(values)
                  editFamily(values)
                }}
              >
                <Form>
                  <VStack alignItems="start">
                    <Flex gap="16px">
                      <FormInput
                        label="คำนำหน้า"
                        name="title"
                        type="select"
                        options={[
                          'นาย',
                          'นาง',
                          'นางสาว',
                          'เด็กชาย',
                          'เด็กหญิง',
                        ]}
                        placeholder="เลือกคำนำหน้า"
                        width="139.2px"
                        disable={!isEdit}
                      />
                      <FormInput
                        label="ชื่อ"
                        name="firstName"
                        type="text"
                        placeholder="กรอกชื่อ"
                        width="219.08px"
                        disable={!isEdit}
                      />
                      <FormInput
                        label="นามสกุล"
                        name="lastName"
                        type="text"
                        placeholder="กรอกนามสกุล"
                        width="238.45px"
                        disable={!isEdit}
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
                          'ผู้อาศัย',
                        ]}
                        placeholder="เลือกความเกี่ยวข้อง"
                        width="120px"
                        disable={!isEdit}
                      />
                      <FormInput
                        label="เลขบัตรประจำตัวประชาชน"
                        name="citizenId"
                        type="text"
                        placeholder="กรอกเลขบัตรประจำตัวประชาชน"
                        width="250px"
                        disable={true}
                      />
                    </Flex>
                    {isEdit && (
                      <Flex
                        justifyContent="flex-end"
                        alignItems="center"
                        columnGap="1rem"
                        width="100%"
                      >
                        <Button
                          onClick={() => {
                            setEdit(false)
                            getId(null)
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
              {deleteModal}
            </VStack>
          )}
        </HStack>
      </Flex>
    </Box>
  )
}

let boxLayout = {
  backgroundColor: 'background.white',
  margin: 'auto',
  borderRadius: '8px',
  position: 'relative',
  padding: '20px',
  width: '909px',
}
let threeDot = {
  position: 'absolute',
  top: '10px',
  right: '20px',
  color: 'accent.black',
}
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

export default FamilyInfoBox

/**(
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
  ) */

/**{boxMode === 'add' ? (
            <FamilyInputform
              disable={false}
              formikintialValues={{}}
              citizenIdDisable={false}
              closeBTN={() => {
                if (closeBTN) closeBTN()
              }}
              APIaction={(values) => {
                addFamily()
                //wait api add family
                toast(addFamilySuccess)
                if (closeBTN) closeBTN()
              }}
            />
          ) : (
            <FamilyInputform
              disable={!editMember}
              citizenIdDisable={true}
              closeBTN={() => {
                setEditMember(false)
              }}
              toastDiscription={editFamilySuccess}
              modal={deleteModal}
              formikintialValues={data}
              menu={menu}
              APIaction={() => {
                editFamily()
                toast(editFamilySuccess)
                setEditMember(false)
              }}
            />
          )} */
