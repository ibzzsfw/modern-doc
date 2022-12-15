import { NextFunction, Request, Response, Router } from 'express'
import FieldHandler from '../handlers/field.handler'

class UserRouter {
  private router = Router()
  private handler = new FieldHandler()

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.post('/create', this.handler.createField)
    this.router.post('/create-many', this.handler.createFieldMany)
    this.router.get('/get-all', this.handler.getAllField)
    this.router.put(
      '/edit-official-name',
      this.handler.editFieldOfficialName
    )
    this.router.post('/add-choice', this.handler.addFieldChoice)
    this.router.delete(
      '/delete-choice/:choiceId',
      this.handler.deleteFieldChoice
    )
  }
}

export default UserRouter
