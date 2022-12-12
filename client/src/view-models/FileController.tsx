import axios from 'axios'
import { LoginDataModel } from '@models/LoginDataStore.model'
import Field from '@view-models/Field'
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
      `${process.env.VITE_API_ENDPOINT}/file/get-by-id/${this.getTypeName(
        type
      )}/${id}`,
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )

    return response.data
  }

  static async getLatestFile(type: string = 'generatedFile') {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/file/latest-files/${type}`,
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async search(name: any) {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/file/search/${name}`,
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async saveGeneratedFile(fileId: string | undefined, fields: Field[]) {
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/file/new/generatedFile/${fileId}`,
      {
        fields: fields,
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

  static newUploadedFile = async (
    fileId: string | undefined,
    URI: string,
    note: string,
    expiredDate: Date | null
  ) => {
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/file/new/uploadedFile/${fileId}`,
      {
        URI: URI,
        note: note,
        expiredDate: expiredDate != null ? expiredDate?.toISOString() : null,
      },
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async editNote(
    content: string,
    type: string | undefined,
    id: string | undefined
  ) {
    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/file/add-note/${type}/${id}`,
      {
        note: content,
      },
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async deleteFile(type: string | undefined, id: string | undefined) {
    let response = await axios.delete(
      `${process.env.VITE_API_ENDPOINT}/file/delete/${type}/${id}`,
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async shareFile(type: string | undefined, id: string | undefined) {
    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/file/share/${type}/${id}`,
      {},
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async unshareFile(type: string | undefined, id: string | undefined) {
    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/file/unshare/${type}/${id}`,
      {},
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }
}

export default FileController
