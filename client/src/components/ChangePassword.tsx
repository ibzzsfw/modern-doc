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

type propsType = {
  editProfile: boolean
  callback?: ()=>{}
}


const ChangePassword = ({ editProfile,callback }: propsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  return (
    <>
      <Button
        variant="outline"
        width="240px"
        leftIcon={<HiKey />}
        marginBottom="24px"
        display={!isOpen ? 'unset' : 'none'}
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
          <Formik
              initialValues={{
                password: '',
                newPassword: '',
                confirmPassword: '',
              }}
              onSubmit={(values) => {
                if (values.newPassword == values.confirmPassword) {
                  console.log(values.newPassword)
                  console.log(values.confirmPassword)
                  toast({
                    title: 'เปลี่ยนรหัสผ่านสำเร็จ',
                    status: 'success',
                    duration: 5000,
                   
                  }) 
                  onClose()
                }else{
                  toast({
                    title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
                    status: 'error',
                    duration: 5000,
                  })

                }
              }}
            >
              <Form>
          <ModalBody>
           
                <FormInput
                  label="รหัสผ่านยืนยัน"
                  name="password"
                  type="password"
                  placeholder="กรอกรหัสผ่านเพื่อยืนยัน"
                  showCorrectBorder
                />
                <FormInput
                  label="รหัสผ่านใหม่"
                  name="newpassword"
                  type="password"
                  placeholder="รหัสผ่านใหม่"
                  showCorrectBorder
                />
                <FormInput
                  label="ยืนยันรหัสผ่านใหม่"
                  name="newpasswordconfirm"
                  type="password"
                  placeholder="ยืนยันรหัสผ่านใหม่"
                  showCorrectBorder
                />
            
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Flex gap="22px">
              <Button variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
              <Button variant="solid" colorScheme="blue" type="submit" name='submit'>
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

export default ChangePassword
