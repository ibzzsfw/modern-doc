import { Router } from 'express'
import UserRouter from './UserRouter'
import TestRouter from './TestRouter'
import TagRouter from './TagRouter'
import FieldRouter from './FieldRouter'
import GeneratedFileRouter from './GeneratedFileRouter'

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
    this.router.use('/field', FieldRouter)
    this.router.use('/generated-file', GeneratedFileRouter)
  }

  getRouter = (): Router => {
    return this.router
  }
}

export default new MasterRouter().getRouter()
