import { NextFunction, Request, Response, Router } from 'express'
import NoteHandler from '../handlers/note.handler'

class NoteRouter {
  private router = Router()
  private handler = new NoteHandler()

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.post('/add', this.handler.addFreeNote)
    this.router.put('/edit/:noteId', this.handler.editNote)
    this.router.delete('/delete/:noteId', this.handler.deleteNote)
    this.router.get('/all', this.handler.getAllNote)
  }
}

export default NoteRouter
