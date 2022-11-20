
//----------------------------not use


import { Button, Flex } from '@chakra-ui/react'
import FormInput from '@components/FormInput'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
  useDisclosure
} from '@chakra-ui/react'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { useMyProfileStore } from '@stores/MyProfilePageStore'
type porpTypes = {
  isOpen?: boolean
  toggleModal?: (values: boolean) => boolean
}

const ConfirmPassword = ({  toggleModal }: porpTypes) => {
  const toast = useToast()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const submitForm = () => {
    console.log('api process')
    toast({
      title: 'แก้ไขข้อมูลส่วนตัวสำเร็จ',
      status: 'success',
      duration: 5000,
    })
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size="sm"
        isCentered
      >
        <ModalOverlay />
        <ModalContent justifyContent="center">
          <Formik
            initialValues={{
              password: '',
            }}
            onReset={(values) => {
              console.log(values)
              onClose()
            }}
            onSubmit={(values) => {
              console.log(values)
              submitForm()
            }}
          >
            <Form>
              <ModalHeader>ยืนยันการแก้ไขข้อมูล</ModalHeader>
              <ModalBody>
                <FormInput
                  label="รหัสผ่านยืนยัน"
                  name="password"
                  type="password"
                  placeholder="กรอกรหัสผ่านเพื่อยืนยัน"
                />
              </ModalBody>
              <ModalFooter justifyContent="center">
                <Flex gap="22px">
                  <Button variant="outline" type="reset">
                    ยกเลิก
                  </Button>
                  <Button variant="solid" colorScheme="blue" type="submit">
                    ตกลง
                  </Button>
                </Flex>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConfirmPassword
