import axios from 'axios'
import { LoginDataModel } from '@models/LoginDataStore.model'
import Field from '@view-models/Field'

class FolderController {
  static async getFolderById(id: string | undefined) {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/folder/get-by-id/${id}`,
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async getLatestFolder() {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/folder/latest-folders`,
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async search(name: string) {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/folder/search/${name}`,
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async getField(idArr: string[]) {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/folder/get-field`,
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
          'generated-file-ids': JSON.stringify(idArr),
        },
      }
    )
    return response.data
  }

  static async editNote(content: string, id: string | undefined) {
    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/folder/add-note/${id}`,
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

    return response.data
  }

  static async saveFolder(
    folderId: string | undefined,
    fields: Field[],
    generatedFiles: { id: string }[]
  ) {
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/folder/new/${folderId}`,
      {
        fields: fields,
        generatedFiles: generatedFiles,
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

export default FolderController
