import { Request, Response } from 'express'
import NoteController from '@controllers/note.controller'

class NoteHandler {

  private controller = new NoteController()

  addFreeNote = async (req: Request, res: Response) => {
    this.controller.addFreeNote(req, res)
  }

  editNote = async (req: Request, res: Response) => {
    this.controller.editNote(req, res)
  }

  deleteNote = async (req: Request, res: Response) => {
    this.controller.deleteNote(req, res)
  }

  getAllNote = async (req: Request, res: Response) => {
    this.controller.getAllNote(req, res)
  }
}

export default NoteHandler
