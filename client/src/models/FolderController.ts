import axios from 'axios'
import { useLoginDataStore } from '@stores/LoginDataStore'
class FolderController {
  static async getFolderById(id: string | undefined) {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/folder/get-by-id/${id}`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
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
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
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
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
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
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
          'generated-file-ids': JSON.stringify(idArr),
        },
      }
    )
    return response.data
  }
}

export default FolderController
