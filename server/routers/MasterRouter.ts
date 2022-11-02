import { Router } from 'express'
import UserRouter from './UserRouter'
import TestRouter from './TestRouter'
import TagRouter from './TagRouter'

class MasterRouter {
  private router = Router()
  private UserRouter = UserRouter

  constructor() {
    this.configureRoutes()
  }

  configureRoutes = (): void => {
    this.router.use('/user', this.UserRouter)
    this.router.use('/test', TestRouter)
    this.router.use('/tag', TagRouter)

  }

  getRouter = (): Router => {
    return this.router
  }
}

export default new MasterRouter().getRouter()
