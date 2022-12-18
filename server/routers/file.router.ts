import { NextFunction, Request, Response, Router } from 'express'
import FileHandler from '@handlers/file.handler'

class FileRouter {
  private router = Router()
  private handler = new FileHandler()

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.get('/get-by-id/:type/:id', this.handler.getFileById)
    this.router.get('/latest-files/:type', this.handler.getLatestFiles)
    this.router.get('/search/:name', this.handler.searchByName)
    this.router.get('/search/', this.handler.getAll)
    this.router.post(
      '/new/generatedFile/:fileId',
      this.handler.newGeneratedFile
    )
    this.router.post(
      '/new/uploadedFile/:fileId',
      this.handler.newUploadedFile
    )
    this.router.put('/add-note/:type/:fileId', this.handler.addNote)
    this.router.put('/share/:type/:fileId', this.handler.shareFile)
    this.router.put('/unshare/:type/:fileId', this.handler.unShareFile)
    this.router.delete('/delete/:type/:fileId', this.handler.deleteFile)
    this.router.post(
      '/new/userFreeUploadFile',
      this.handler.newUserFreeUploadFile
    )
    this.router.get(
      '/get-shared-file/:type/:fileId',
      this.handler.getSharedFile
    )
  }
}

export default FileRouter