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
import { HiKey } from 'react-icons/hi'

const ChangePassword = ({ editProfile }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  return (
    <>
      <Button
        variant="outline"
        width="240px"
        leftIcon={<HiKey />}
        marginBottom="24px"
        display={editProfile ? 'unset' : 'none'}
        onClick={onOpen}
      >
        เปลี่ยนรหัสผ่าน
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent justifyContent="center">
          <ModalHeader>เปลี่ยนรหัสผ่านใหม่</ModalHeader>
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
                <FormInput
                  label="รหัสผ่านใหม่"
                  name="password"
                  type="password"
                  placeholder="รหัสผ่านใหม่"
                  showCorrectBorder
                />
                <FormInput
                  label="ยืนยันรหัสผ่านใหม่"
                  name="password"
                  type="password"
                  placeholder="ยืนยันรหัสผ่านใหม่"
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
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => {
                  toast({
                    title: 'เปลี่ยนรหัสผ่านสำเร็จ',
                    status: 'success',
                    duration: 5000,
                  })
                }}
              >
                ตกลง
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChangePassword
