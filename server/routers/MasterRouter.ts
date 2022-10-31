import { Router } from 'express'
import UserRouter from './UserRouter'

class MasterRouter {
  private router = Router()
  private UserRouter = UserRouter

  constructor() {
    this.configureRoutes()
  }

  configureRoutes = (): void => {
    this.router.use('/user', this.UserRouter)
  }

  getRouter = (): Router => {
    return this.router
  }
}

export default new MasterRouter().getRouter()
