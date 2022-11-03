import { NextFunction, Request, Response, Router } from 'express'
import TestController from '@controllers/TestController'

class UserRouter {
  private router = Router()
  private controller = TestController

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.get('/', this.controller.test)
  }
}

export default new UserRouter().getRouter()
