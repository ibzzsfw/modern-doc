import axios from 'axios'
import { useLoginDataStore } from '@stores/LoginDataStore'
interface RegisterForm {
  title: string
  firstName: string
  lastName: string
  sex: string
  birthDate: string
  citizenId: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

interface loginForm {
  phoneNumber: string
  password: string
}
class UserController {
  static register = async (data: RegisterForm): Promise<any> => {
    let response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user`,
      data
    )
    return response.data
  }

  static login = async (phoneNumber: string) => {
    let response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/login`,
      {
        phoneNumber: phoneNumber,
      }
    )
    return response.data
  }

  static checkPhonePassword = async ({ phoneNumber, password }: loginForm) => {
    let response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/check-phone-password`,
      {
        phoneNumber: phoneNumber,
        password: password,
      }
    )
    return { ...response.data, phoneNumber: phoneNumber }
  }

  static logout = async () => {
    useLoginDataStore.setState({
      user: {},
    })
    window.location.pathname = '/'
  }
}

export default UserController
