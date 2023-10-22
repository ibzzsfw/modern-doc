import INoteService from '@contracts/services/note.service';
import { Request, Response } from 'express';
import BaseController from '.';

class NoteController extends BaseController {

  private _service: INoteService

  addFreeNote = async (req: Request, res: Response) => {

    const { heading, content } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this._service.addFreeNote(heading, content, userId)
    res.status(response.status).json(response.json)
  }

  editNote = async (req: Request, res: Response) => {

    const { noteId } = req.params
    const { heading, content } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this._service.editNote(noteId, heading, content, userId)
    res.status(response.status).json(response.json)
  }

  deleteNote = async (req: Request, res: Response) => {

    const { noteId } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this._service.deleteNote(noteId, userId)
    res.status(response.status).json(response.json)
  }

  getAllNote = async (req: Request, res: Response) => {

    const userId = req.headers['user-id'] as string

    const response = await this._service.getAllNote(userId)
    res.status(response.status).json(response.json)
  }

}

export default NoteController