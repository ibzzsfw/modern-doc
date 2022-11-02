import { NextFunction, Request, Response, Router } from 'express'
import TagController from '../controllers/TagController'

class UserRouter {
  private router = Router()
  private controller = TagController

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.get('/get-all', this.controller.getAllTag)
    this.router.post('/create', this.controller.createTag)
    this.router.get('/name/:name', this.controller.getTagByName)
    this.router.get('/id/:id', this.controller.getTagById)
    this.router.put('/edit-name', this.controller.editTagName)
  }
}

export default new UserRouter().getRouter()
