import { NextFunction, Request, Response, Router } from 'express'
import FileController from '../controllers/Files.controller'

class NoteRouter {

  private router = Router()
  private controller = new FileController()

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.getAll('/', this.controller.getAll)
  }
}

export default new NoteRouter().getRouter()
