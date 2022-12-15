import { NextFunction, Request, Response, Router } from 'express'
import FolderHandler from '../handlers/folder.handler'

class FolderRouter {
  private router = Router()
  private handler = new FolderHandler()

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.get('/get-by-id/:id', this.handler.getFolderById)
    this.router.get('/latest-folders', this.handler.getLatestFolder)
    this.router.get('/search/:name', this.handler.searchByName)
    this.router.get('/search/', this.handler.getAll)
    this.router.put('/add-note/:userFolderId', this.handler.addNote)
    this.router.get('/get-field/', this.handler.getField)
    this.router.post('/new/:folderId', this.handler.saveFolder)
  }
}

export default FolderRouter
