import axios from 'axios'
// import { LoginDataModel } from '@models/LoginDataStore.model'
import UserModel from '../models/User.model'
import FieldViewModel from './Field.viewmodel'
import FolderViewModel from './Folder.viewmodel'
class FolderController {

  static async getFolderById(id: string | undefined) {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/folder/get-by-id/${id}`,
      {
        headers: {
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )
    let { name, officialName, date, description, file, note } = response.data
    let folder = new FolderViewModel({
      id: response.data.id,
      dateUpload: date,
      description: description,
      note: note,
      name: name,
      officialName: officialName,
      file: file
    });
    return folder
  }

  static async getLatestFolder() {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/folder/latest-folders`,
      {
        headers: {
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )
    let latestFolder: FolderViewModel[] = []
    response.data.map((folder: any) => {
      let { name, officialName, date, description, note } = folder
      let newFolder = new FolderViewModel({
        id: folder.id,
        dateUpload: date,
        description: description,
        note: note,
        name: name,
        officialName: officialName,
      })
      latestFolder.push(newFolder)
    })
    return latestFolder
  }

  static async search(name: string) {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/folder/search/${name}`,
      {
        headers: {
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )
    let searchResult: FolderViewModel[] = []
    response.data.map((folder: any) => {
      let { name, officialName, date, description, note, type } = folder
      searchResult.push(new FolderViewModel({
        id: folder.id,
        dateUpload: date,
        description: description,
        note: note,
        name: name,
        officialName: officialName,
        type: type
      }))
    })
    return searchResult
  }

  static async getField(idArr: string[]) {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/folder/get-field`,
      {
        headers: {
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
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
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async saveFolder(
    folderId: string | undefined,
    fields: FieldViewModel[],
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
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )

    return response.data
  }
}

export default FolderController
