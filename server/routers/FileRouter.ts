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
      'new/generatedFile/:fileId',
      this.controller.saveGenerateFile
    )
    this.router.post(
      '/new/uploadedFile/:fileId',
      this.controller.newUploadedFile
    )
    this.router.put('/add-note/:type/:id', this.controller.addNote)
  }
}

export default new FileRouter().getRouter()
