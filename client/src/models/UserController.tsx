import axios, { AxiosError } from 'axios'
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
      `${process.env.VITE_API_ENDPOINT}/user`,
      data
    )
    return response.data
  }

  static login = async (phoneNumber: string) => {
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/user/login`,
      {
        phoneNumber: phoneNumber,
      }
    )
    return response.data
  }

  static checkPhonePassword = async ({ phoneNumber, password }: loginForm) => {
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/user/check-phone-password`,
      {
        phoneNumber: phoneNumber,
        password: password,
      }
    )
    return { ...response.data, phoneNumber: phoneNumber }
  }

  static switchMember = async (userId: string) => {
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/user/switch-member`,
      {
        userId: userId,
      }
    )
    return response.data
  }

  static logout = async () => {
    useLoginDataStore.setState({
      user: null,
    })
    window.location.pathname = '/'
  }

  static checkCitizenIdStatus = async (citizenId: string) => {
    try {
      let response = await axios.get(
        `${process.env.VITE_API_ENDPOINT}/user/citizenId-status/${citizenId}`
      )
      return response.data
    } catch (err: any) {
      console.log(err.response.data.message)
      return err.response.data
    }
  }
}

export default UserController
