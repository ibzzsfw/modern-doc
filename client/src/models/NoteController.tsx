import Note from '@models/Note'
import axios from 'axios'
import { useLoginDataStore } from '@stores/LoginDataStore'

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

  static async addFreeNote() {
    let response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/note/add`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    return response.data
  }
}

export default NoteController
