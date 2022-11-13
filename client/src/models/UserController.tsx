import axios from 'axios'
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

  static login = async ({ phoneNumber, password }: loginForm) => {
    let response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/login`,
      {
        phoneNumber: phoneNumber,
        password: password,
      }
    )
    return response.data
  }
}

export default UserController
