import { useDisclosure, useToast } from '@chakra-ui/react'
import * as Yup from 'yup'

class ChangePasswordViewController {

  disclosure = useDisclosure()
  toast = useToast()
  initialValues: any = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  constructor() { }

  /**
 * @function ChangePasswordSchema
 * @description Yup schema for change password form
 */
  schema = Yup.object().shape({
    oldPassword: Yup.string().required('กรุณากรอกรหัสผ่านเดิม'),
    newPassword: Yup.string().required('กรุณากรอกรหัสผ่านใหม่'),
    confirmPassword: Yup.string().required('กรุณากรอกรหัสผ่านใหม่อีกครั้ง'),
  })

  /**
 * @function setNewPassword
 * @description Set new password
 * @param {any} values - form values of new password
 * @returns {void}
 */
  setNewPassword = async (values: any): Promise<void> => {
    
    if (values.newPassword == values.confirmPassword) {
      this.toast({
        title: 'เปลี่ยนรหัสผ่านสำเร็จ',
        status: 'success',
        duration: 5000,
      })
      this.disclosure.onClose()
    } else {
      this.toast({
        title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
        status: 'error',
        duration: 5000,
      })
    }
  }
}

export default ChangePasswordViewController