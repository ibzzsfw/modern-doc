import { NextFunction, Request, Response, Router } from 'express'
import TagHandler from '../handlers/tag.handler'

class UserRouter {
  private router = Router()
  private handler = new TagHandler()

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.get('/get-all', this.handler.getAllTag)
    this.router.post('/create', this.handler.createTag)
    this.router.post('/create-many', this.handler.createTagMany)
    this.router.get('/name/:name', this.handler.getTagByName)
    this.router.get('/id/:id', this.handler.getTagById)
    this.router.put('/edit-name', this.handler.editTagName)
  }
}

export default UserRouter