import { Button, Flex } from '@chakra-ui/react'
import FormInput from './FormInput'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

const ConfirmPassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const submitForm = () => {
    onClose()
    toast({
      title: 'แก้ไขข้อมูลส่วนตัวสำเร็จ',
      status: 'success',
      duration: 5000,
    })
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        ตกลง
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent justifyContent="center">
          <ModalHeader>ยืนยันการแก้ไขข้อมูล</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                password: '',
              }}
              onSubmit={(values) => {
                console.log(values)
              }}
            >
              <Form>
                <FormInput
                  label="รหัสผ่านยืนยัน"
                  name="password"
                  type="password"
                  placeholder="กรอกรหัสผ่านเพื่อยืนยัน"
                  showCorrectBorder
                />
              </Form>
            </Formik>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Flex gap="22px">
              <Button variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
              <Button variant="solid" colorScheme="blue" onClick={submitForm}>
                ตกลง
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConfirmPassword
