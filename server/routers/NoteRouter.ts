import { NextFunction, Request, Response, Router } from 'express'
import NoteController from '@controllers/NoteController'

class NoteRouter {
  private router = Router()
  private controller = NoteController

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.post('/add', this.controller.addFreeNote)
    this.router.put('/edit/:noteId', this.controller.editNote)
    this.router.delete('/delete/:noteId', this.controller.deleteNote)
    this.router.get('/all', this.controller.getAllNote)
  }
}

export default new NoteRouter().getRouter()
