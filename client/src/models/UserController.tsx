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
  static checkPhoneNumberStatus = async (phoneNumber: string) => {
    try {
      let response = await axios.get(
        `${process.env.VITE_API_ENDPOINT}/user/phone-status/${phoneNumber}`
      )
      return response.data
    } catch (err: any) {
      console.log(err.response.data.message)
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
    console.log(
      title,
      fistName,
      lastName,
      sex,
      phoneNumber,
      birthDate,
      profileURI,
      password
    )
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
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    if (response.status === 200) {
      useLoginDataStore.setState({
        user: {
          ...useLoginDataStore.getState().user,
          ...response.data.data,
        },
      })
      window.location.reload()
    }
    return response.data
  }
}

export default UserController
