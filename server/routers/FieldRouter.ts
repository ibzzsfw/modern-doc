import { NextFunction, Request, Response, Router } from 'express'
import FieldController from '../controllers/FieldController'

class UserRouter {
  private router = Router()
  private controller = FieldController

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.post('/create', this.controller.createField)
    this.router.get('/get-all', this.controller.getAllField)
    this.router.put(
      '/edit-official-name',
      this.controller.editFieldOfficialName
    )
    this.router.post('/add-choice', this.controller.addFieldChoice)
    this.router.delete(
      '/delete-choice/:choiceId',
      this.controller.deleteFieldChoice
    )
  }
}

export default new UserRouter().getRouter()
