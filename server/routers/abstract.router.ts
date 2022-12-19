import { Router } from 'express'

abstract class AbstractRouter {
  protected router = Router()

  constructor() {}

  getRouter = (): Router => this.router

  abstract configureRoutes: () => void
}

export default AbstractRouter