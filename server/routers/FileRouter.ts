import { NextFunction, Request, Response, Router } from 'express'
import FileController from '@controllers/FileController'

class FileRouter {
  private router = Router()
  private controller = FileController

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.get('/:type/:id', this.controller.getFileById)
  }
}

export default new FileRouter().getRouter()
