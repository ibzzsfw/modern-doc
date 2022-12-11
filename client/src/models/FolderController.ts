import { GeneratedFile } from '@models/GeneratedFile'
import axios from 'axios'
import { useLoginDataStore } from '@stores/LoginDataStore'
import Field from '@models/Field'

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

<<<<<<< HEAD
  static async editNote(content : string, id : string | undefined){
    console.log(content,id)
    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/folder/add-note/${id}`,
      {
        note: content,
=======
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
>>>>>>> 159b304bbbe694e15121e5f7b105d472538cb8ad
      },
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
<<<<<<< HEAD

    return response.data
  }


=======
    return response.data
  }
>>>>>>> 159b304bbbe694e15121e5f7b105d472538cb8ad
}

export default FolderController
