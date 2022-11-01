import { NextFunction, Request, Response, Router } from 'express'
import UserController from '../controllers/UserController'

class UserRouter {
  private router = Router()
  private controller = UserController

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.post('/', this.controller.addUser)
    this.router.get(
      '/citizenId-status/:citizenId',
      this.controller.checkCitizenIdStatus
    )
    this.router.get('/test', this.controller.test)
  }
}

export default new UserRouter().getRouter()
