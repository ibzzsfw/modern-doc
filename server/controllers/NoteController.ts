import { Request, Response } from 'express'
import Note from '@models/Note'

class NoteController {
  addFreeNote = async (req: Request, res: Response) => {
    Note.addFreeNote(req, res)
  }

  editNote = async (req: Request, res: Response) => {
    Note.editNote(req, res)
  }

  deleteNote = async (req: Request, res: Response) => {
    Note.deleteNote(req, res)
  }

  getAllNote = async (req: Request, res: Response) => {
    Note.getAllNote(req, res)
  }
}

export default new NoteController()
