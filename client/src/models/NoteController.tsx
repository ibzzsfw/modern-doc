import { useLoginDataStore } from '@stores/LoginDataStore'
import axios from 'axios'

class NoteController {
  static async getLastestNote() {
    let response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/note/all`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    console.log('note', response.data)
    return response.data
  }

  static async deleteNoteById(id: string | undefined) {
    let response = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/note/delete/${id}`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )

    return response.data
  }

  static async addFreeNote(heading: string, content: string) {
    console.log(heading, content)
    let response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/note/add`,
      {
        heading: heading,
        content: content,
      },
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async editNote(heding: string, content: string, id: string | undefined) {
    console.log(heding, content, id)
    let response = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/note/edit/${id}`,
      {
        heading: heding,
        content: content,
      },
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        }
      }
    )
    window.location.reload()
    return response.data
  }
}

export default NoteController
