import axios from 'axios'
import UserModel from '@models/User.model'
import NoteViewModel from '@view-models/Note.viewmodel'

class NoteController {
  static async getLastestNote() {
    let response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/note/all`,
      {
        headers: {
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        },
      }
    )
    let notes: NoteViewModel[] = []
    response.data.map((note: any) => {
      let { id, content, createdDate, heading, modifiedDate, userId } = note
      notes.push(
        new NoteViewModel({
          id,
          content,
          createdDate,
          heading,
          modifiedDate,
        }))
    })
    return notes
  }

  static async deleteNoteById(id: string | undefined) {
    let response = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/note/delete/${id}`,
      {
        headers: {
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
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
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
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
          'user-id': UserModel.getState()?.user?.id,
          token: UserModel.getState()?.user?.token,
        }
      }
    )

    return response.data
  }
}

export default NoteController
