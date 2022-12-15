import { Request, Response } from 'express';
import NoteService from '@services/note.service';

class NoteController {

  private service = new NoteService();

  addFreeNote = async (req: Request, res: Response) => {

    const { heading, content } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this.service.addFreeNote(heading, content, userId)
    res.status(response.status).json(response.json)
  }

  editNote = async (req: Request, res: Response) => {

    const { noteId } = req.params
    const { heading, content } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this.service.editNote(noteId, heading, content, userId)
    res.status(response.status).json(response.json)
  }

  deleteNote = async (req: Request, res: Response) => {

    const { noteId } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this.service.deleteNote(noteId, userId)
    res.status(response.status).json(response.json)
  }

  getAllNote = async (req: Request, res: Response) => {

    const userId = req.headers['user-id'] as string

    const response = await this.service.getAllNote(userId)
    res.status(response.status).json(response.json)
  }

}

export default NoteController