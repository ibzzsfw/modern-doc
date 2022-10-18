import { NextFunction, Request, Response, Router } from "express"
import ExampleController from "../controllers/ExampleController"

class ExampleRouter
{
  private router = Router()
  private controller = ExampleController

  constructor()
  {
    this.configureRoutes()
  }

  getRouter = (): Router =>
  {
    return this.router
  }

  configureRoutes = (): void =>
  {
    this.router.get("/function1", this.controller.myFunction1)
    this.router.get("/function2", this.controller.myFunction2)
  }
}

export default new ExampleRouter().getRouter()