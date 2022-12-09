import axios from 'axios'
import { useLoginDataStore } from '@stores/LoginDataStore'
import Field from '@models/Field'
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

    console.log('file', response.data)
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

  static async search(name: any) {
    let response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/file/search/${name}`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async saveGeneratedFile(fileId: string | undefined, fields: Field[]) {
    let response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/file/save-generated-file/${fileId}`,
      {
        fields: fields,
      },
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
        },
      }
    )
    return response.data
  }
}

export default FileController
