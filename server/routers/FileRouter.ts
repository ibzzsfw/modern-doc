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
    this.router.get('/get-by-id/:type/:id', this.controller.getFileById)
    this.router.get('/latest-files/:type', this.controller.getLatestFiles)
    this.router.get('/search/:name', this.controller.searchByName)
    this.router.post(
      '/save-generated-file/:fileId',
      this.controller.saveGenerateFile
    )
  }
}

export default new FileRouter().getRouter()
