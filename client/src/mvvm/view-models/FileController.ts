import axios from 'axios'
import { LoginDataModel } from '@models/LoginDataStore.model'
import UploadFileViewModel from './UploadFile.viewmodel'
import GenerateFileViewModel from './GenerateFiles.viewmodel'
import FreeUploadedFileViewModel from './FreeUploadFile.viewmodel'
import DateFieldViewModel from './DateField.viewmodel'
import TextFieldViewModel from './TextField.viewmodel'
import NumberFieldViewModel from './NumberField.viewmodel'
import EmailFieldViewModel from './EmailField.viewmodel'
import PhoneNumberFieldViewModel from './PhoneNumberField.viewmodel'
import SingleSelectFieldViewModel from './SingleSelectField.viewmodel'
import MultipleSelectFieldViewModel from './MultipleSelectField.viewmodel'
import TagViewModel from './Tag.viewmodel'
import AgeFieldViewModel from './AgeField.viewmodel'
import FieldViewModel from './Field.viewmodel'

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
        let fieldsArray: object[] = []
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
          fields: fieldsArray,
          name,
          tag: tagsArray
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
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
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
    return files
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
    let files: any[] = []
    response.data.map((file: any) => {
      let { URI, date, description, id, name, officialName } = file
      let fileArg = {
        id,
        dateUpload: date,
        description,
        officialName,
        URI,
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
