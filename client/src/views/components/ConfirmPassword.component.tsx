import { Button, Flex } from '@chakra-ui/react'
import FormInput from '@components/FormInput.component'
import { Formik, Form } from 'formik'
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

const ConfirmPassword = () => {
  const toast = useToast()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const submitForm = () => {
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
            initialValues={{password: '',}}
            onReset={() => onClose()}
            onSubmit={() => submitForm()}
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
