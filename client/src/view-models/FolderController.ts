import UserModel from '@models/User.model'
import FieldViewModel from '@view-models/Field.viewmodel'
import FolderViewModel from '@view-models/Folder.viewmodel'
import GenerateFileViewModel from '@view-models/GenerateFiles.viewmodel'
import UploadFileViewModel from '@view-models/UploadFile.viewmodel'
import axios from 'axios'
class FolderController {

  private static instance: FolderController
  private constructor() { }
  static getInstance() {
    if (!FolderController.instance) {
      FolderController.instance = new FolderController()
    }
    return FolderController.instance
  }

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
    let files: any[] = []
    file.map((file: any) => {
      let { amount, remark, file: fileData } = file
      let { id, name, officialName, URI, previewURI, type } = file
      let fileArg = {
        id: id,
        name: name,
        officialName: officialName,
        URI: URI,
        previewURI: previewURI,
        type: type,
      }
      let newFile: any
      if (type == 'uploadedFile') {
        newFile = new UploadFileViewModel(fileArg)
      } else {
        newFile = new GenerateFileViewModel(fileArg)
      }
      files.push({
        file: newFile,
        amount: amount,
        remark: remark,
      })
    })
    let folder = new FolderViewModel({
      id: response.data.id,
      dateUpload: date,
      description: description,
      note: note,
      name: name,
      officialName: officialName,
      file: files
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
