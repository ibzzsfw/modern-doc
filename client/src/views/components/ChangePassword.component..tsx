import { Formik, Form } from 'formik'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ButtonGroup,
  Button
} from '@chakra-ui/react'
import { HiKey } from 'react-icons/hi'
import ChangePasswordViewController from '@view-controllers/ChangePassword.component.viewcontroller'
import FormInput from '@components/FormInput.component'

const ChangePassword = () => {

  const viewController = new ChangePasswordViewController()
  const { isOpen, onOpen, onClose } = viewController.disclosure


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
            initialValues={viewController.initialValues}
            validationSchema={viewController.schema}
            onReset={() => onClose()}
            onSubmit={(values) => viewController.setNewPassword(values)}
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
