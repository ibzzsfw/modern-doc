import { LoginDataModel } from '@models/LoginDataStore.model'
import axios from 'axios'

class NoteController {
  static async getLastestNote() {
    let response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/note/all`,
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async deleteNoteById(id: string | undefined) {
    let response = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/note/delete/${id}`,
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        },
      }
    )

    return response.data
  }

  static async addFreeNote(heading: string, content: string) {
    let response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/note/add`,
      {
        heading: heading,
        content: content,
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

  static async editNote(heding: string, content: string, id: string | undefined) {
    let response = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/note/edit/${id}`,
      {
        heading: heding,
        content: content,
      },
      {
        headers: {
          'user-id': LoginDataModel.getState()?.user?.id,
          token: LoginDataModel.getState()?.user?.token,
        }
      }
    )

    return response.data
  }
}

export default NoteController
