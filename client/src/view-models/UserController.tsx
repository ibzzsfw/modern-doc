import axios from 'axios'
import { LoginDataModel } from '@models/LoginDataStore.model'
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
    LoginDataModel.setState({
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
      return err.response.data
    }
  }
  static async editProfile(
    title: string,
    fistName: string,
    lastName: string,
    sex: string,
    phoneNumber: string,
    birthDate: string,
    profileURI: string,
    password: string
  ) {
    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/user/edit-profile`,
      {
        title: title,
        firstName: fistName,
        lastName: lastName,
        sex: sex,
        phoneNumber: phoneNumber,
        birthDate: birthDate,
        profileURI: profileURI,
        password: password,
      },
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )

    return response.data
  }
}

export default UserController
