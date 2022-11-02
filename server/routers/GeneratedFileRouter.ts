import { NextFunction, Request, Response, Router } from 'express'
import GeneratedFileController from '../controllers/GeneratedFileController'

class UserRouter {
  private router = Router()
  private controller = GeneratedFileController

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.post('/create', this.controller.create)
    this.router.get('/get-all', this.controller.getAll)
    this.router.post('/add-tag', this.controller.addTag)
    this.router.post('/add-field', this.controller.addField)
    this.router.delete(
      '/delete-tag/:generatedFileId/:tagId',
      this.controller.deleteTag
    )
    this.router.delete(
      '/delete-field/:generatedFileId/:fieldId',
      this.controller.deleteField
    )
    this.router.get('/get-by-id/:id', this.controller.getById)
  }
}

export default new UserRouter().getRouter()
