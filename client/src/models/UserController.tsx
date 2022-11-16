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
      user: {
        userId: '',
        householdId: '',
        title: '',
        firstName: '',
        lastName: '',
        citizenId: '',
        phoneNumber: '',
        sex: '',
        token: '',
        relationship: '',
        profileURI:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
      },
    })
    window.location.pathname = '/'
  }
}

export default UserController
