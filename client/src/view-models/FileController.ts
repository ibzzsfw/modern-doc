import axios from 'axios'
import UserModel from '@models/User.model'
import UploadFileViewModel from '@view-models/UploadFile.viewmodel'
import GenerateFileViewModel from '@view-models/GenerateFiles.viewmodel'
import FreeUploadedFileViewModel from '@view-models/FreeUploadFile.viewmodel'
import FieldViewModel from '@view-models/Field.viewmodel'
import DateFieldViewModel from '@view-models/DateField.viewmodel'
import TextFieldViewModel from '@view-models/TextField.viewmodel'
import NumberFieldViewModel from '@view-models/NumberField.viewmodel'
import EmailFieldViewModel from '@view-models/EmailField.viewmodel'
import PhoneNumberFieldViewModel from '@view-models/PhoneNumberField.viewmodel'
import SingleSelectFieldViewModel from '@view-models/SingleSelectField.viewmodel'
import MultipleSelectFieldViewModel from '@view-models/MultipleSelectField.viewmodel'
import AgeFieldViewModel from '@view-models/AgeField.viewmodel'
import TagViewModel from '@view-models/Tag.viewmodel'

type fieldType = TextFieldViewModel
  | NumberFieldViewModel
  | EmailFieldViewModel
  | PhoneNumberFieldViewModel
  | DateFieldViewModel
  | SingleSelectFieldViewModel
  | MultipleSelectFieldViewModel
  | AgeFieldViewModel

class FileController {

  static getTypeName = (type: string) => {
    switch (type) {
      case '1':
        return 'generatedFile'
      case '2':
        return 'uploadedFile'
      case '3':
        return 'sharedFile'
      default:
        return 'userFreeUploadFile'
    }
  }

  static async getFileById(id: string, type: string, isSharedFile: boolean = false) {
    if (isSharedFile) {
      let responseTest = await axios.get(
        `${process.env.VITE_API_ENDPOINT
        }/file/get-shared-file/${this.getTypeName(type)}/${id}`,
        {
          headers: {
            'user-id': UserModel.getState()?.user?.id,
            token: UserModel.getState()?.user?.token,
          },
        }
      )

      console.log('file', responseTest.data)
    }
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/file/get-by-id/${this.getTypeName(
        type
      )}/${id}`,
      {
        headers: {
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )

    let { URI, date, description, fields, name, note, officialName } = response.data
    let tagsArray: TagViewModel[] = []
    response.data?.tags.map((tag: any) => {
      tagsArray.push(new TagViewModel({
        id: tag.id,
        name: tag.name
      }))
    })
    let fileArg = {
      id: response.data.id,
      dateUpload: date,
      description,
      note,
      officialName,
      URI,
    }
    switch (response.data.type) {
      case 'generatedFile':
        let fieldsArray: FieldViewModel[] = []
        let newField: fieldType
        fields.map((field: any) => {
          let { name, type, officialName, description, date, fieldChoice, generatedFileId, isRequired, order, userValue } = field
          let fieldArg = {
            id: field.id,
            name,
            type,
            officialName,
            description,
            choices: fieldChoice,
            userValue,
            date,
            generatedFileId,
            isRequired,
            order,
          }
          switch (type) {
            case 'text':
              newField = new TextFieldViewModel(fieldArg)
              break
            case 'number':
              newField = new NumberFieldViewModel(fieldArg)
              break
            case 'email':
              newField = new EmailFieldViewModel(fieldArg)
              break
            case 'phone':
              newField = new PhoneNumberFieldViewModel(fieldArg)
              break
            case 'date':
              newField = new DateFieldViewModel(fieldArg)
              break
            case 'singleSelect':
              newField = new SingleSelectFieldViewModel(fieldArg)
              break
            case 'multipleSelect':
              newField = new MultipleSelectFieldViewModel(fieldArg)
              break
            case 'age':
              newField = new AgeFieldViewModel(fieldArg)
              break
            default:
              break
          }
          fieldsArray.push(newField)
        })
        return new GenerateFileViewModel(Object.assign(fileArg, {
          name,
          tag: tagsArray,
          fields: fieldsArray
          }))
      case 'uploadedFile':
        return new UploadFileViewModel(Object.assign(fileArg, {
          name,
          tag: tagsArray
        }))
      case 'userFreeUploadFile':
        return new FreeUploadedFileViewModel(fileArg)
    }
  }

  static async getLatestFile(type: string = 'generatedFile') {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/file/latest-files/${type}`,
      {
        headers: {
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )
    let files: any[] = []
    response.data.map((file: any) => {
      let { date, description, name, note, officialName, id } = file
      let fileArg = {
        id,
        dateUpload: date,
        description,
        note,
        officialName,
      }
      switch (file.type) {
        case 'userFreeUploadFile':
          files.push(new FreeUploadedFileViewModel(fileArg))
          break
        case 'uploadedFile':
          files.push(new UploadFileViewModel(Object.assign(fileArg, {
            name,
          })))
          break
        case 'generatedFile':
          files.push(new GenerateFileViewModel(Object.assign(fileArg, {
            name,
          })))
          break
        default:
          break
      }
    })
    console.log('files', files)
    return files
  }

  static async search(name: any) {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/file/search/${name}`,
      {
        headers: {
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )
    let files: (GenerateFileViewModel | UploadFileViewModel | FreeUploadedFileViewModel)[] = []
    response.data.map((file: any) => {
      let { URI, date, description, id, name, officialName } = file
      let fileArg = {
        id,
        dateUpload: date,
        description,
        URI,
      }
      switch (file.type) {
        case 'userFreeUploadFile':
          files.push(new FreeUploadedFileViewModel(Object.assign(fileArg, {
            officialName: name
            })))
          break
        case 'uploadedFile':
          files.push(new UploadFileViewModel(Object.assign(fileArg, {
            officialName,
            name
            })))
          break
        case 'generatedFile':
          files.push(new GenerateFileViewModel(Object.assign(fileArg, {
            officialName,
            name
            })))
          break
        default:
          break
      }
    })
    return files
  }

  static async saveGeneratedFile(fileId: string | undefined, fields: FieldViewModel[]) {
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/file/new/generatedFile/${fileId}`,
      {
        fields: fields,
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
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
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
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
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
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
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
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
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
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async newUserFreeUploadedFile(
    officialName: string,
    URI: string,
    expiredDate: Date | null,
    note: string
  ) {
    console.log('newUserFreeUploadedFile', officialName, URI, expiredDate, note)
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/file/new/userFreeUploadFile`,
      {
        officialName: officialName,
        URI: URI,
        expiredDate: expiredDate,
        note: note,
      },
      {
        headers: {
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }
}

export default FileController
