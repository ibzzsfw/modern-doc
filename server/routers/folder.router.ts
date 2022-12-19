import FolderHandler from '@handlers/folder.handler'
import AbstractRouter from '@routers/abstract.router'

class FolderRouter extends AbstractRouter {
  private handler = new FolderHandler()

  constructor() {
    super()
    this.configureRoutes()
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
