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
class FileController {
  static getTypeName = (type: string) => {
    switch (type) {
      case '1':
        return 'generatedFile'
      case '2':
        return 'uploadedFile'
      default:
        return 'userFreeUploadFile'
    }
  }

  static async getFileById(id: string, type: string) {
    let response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/file/get-by-id/${this.getTypeName(
        type
      )}/${id}`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async getLatestFile() {
    let response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/file/latest-files/generatedFile`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    return response.data
  }
}

export default FileController
