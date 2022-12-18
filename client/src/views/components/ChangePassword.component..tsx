import FormInput from '@components/FormInput.component'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import UserController from '@view-models/UserController'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  useToast,
  ButtonGroup,
} from '@chakra-ui/react'
import { HiKey } from 'react-icons/hi'

const ChangePassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('กรุณากรอกรหัสผ่านเดิม'),
    newPassword: Yup.string().required('กรุณากรอกรหัสผ่านใหม่'),
    confirmPassword: Yup.string().required('กรุณากรอกรหัสผ่านใหม่อีกครั้ง'),
  })
  //-------------api change password----------------
  const changePassword = useMutation(
    (values: { oldPassword: any; newPassword: any }) => {
      return UserController.changePassword(
        values.oldPassword,
        values.newPassword
      )
    },
    {
      onSuccess: (data: any) => {
        toast({
          title: 'เปลี่ยนรหัสผ่านสำเร็จ',
          status: 'success',
          duration: 5000,
        })
        window.location.reload()
      },
      onError: (error: any) => {
        toast({
          title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
          status: 'error',
          duration: 5000,
        })
      },
    }
  )
  const setNewPassword = async (values: {
    oldPassword: any
    confirmPassword: any
    newPassword: any
  }) => {
    if (values.newPassword == values.confirmPassword) {
      await changePassword.mutateAsync({ ...values })
    } else {
      toast({
        title: 'รหัสผ่านไม่ตรงกัน',
        status: 'warning',
        duration: 5000,
      })
    }
  }

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
        isCentered
      >
        <ModalOverlay />
        <ModalContent justifyContent="center">
          <ModalHeader>เปลี่ยนรหัสผ่านใหม่</ModalHeader>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={ChangePasswordSchema}
            onReset={(values) => {
              onClose()
            }}
            onSubmit={(values) => {
              //-----------------api process-----------------
              setNewPassword(values)
            }}
          >
            <Form>
              <ModalBody>
                <FormInput
                  label="รหัสผ่านยืนยัน"
                  name="oldPassword"
                  type="password"
                  placeholder="กรอกรหัสผ่านเพื่อยืนยัน"
                />
                <FormInput
                  label="รหัสผ่านใหม่"
                  name="newPassword"
                  type="password"
                  placeholder="รหัสผ่านใหม่"
                />
                <FormInput
                  label="ยืนยันรหัสผ่านใหม่"
                  name="confirmPassword"
                  type="password"
                  placeholder="ยืนยันรหัสผ่านใหม่"
                />
              </ModalBody>

              <ModalFooter justifyContent="flex-end">
                <ButtonGroup gap="10px" size="md">
                  <Button variant="outline" type="reset">
                    ยกเลิก
                  </Button>
                  <Button variant="solid" colorScheme="blue" type="submit">
                    ตกลง
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChangePassword