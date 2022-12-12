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
      '/new/generatedFile/:fileId',
      this.controller.newGeneratedFile
    )
    this.router.post(
      '/new/uploadedFile/:fileId',
      this.controller.newUploadedFile
    )
    this.router.put('/add-note/:type/:fileId', this.controller.addNote)
    this.router.put('/share/:type/:fileId', this.controller.shareFile)
    this.router.put('/unshare/:type/:fileId', this.controller.unShareFile)
    this.router.delete('/delete/:type/:fileId', this.controller.deleteFile)
  }
}

export default new FileRouter().getRouter()
