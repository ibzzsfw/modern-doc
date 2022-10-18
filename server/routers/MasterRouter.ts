import { Router } from "express"
import ExampleRouter from "./ExampleRouter"

class MasterRouter
{
  private router = Router()
  private exampleRouter = ExampleRouter

  constructor()
  {
    this.configureRoutes()
  }

  configureRoutes = (): void =>
  {
    this.router.use("/example", this.exampleRouter)
  }

  getRouter = (): Router =>
  {
    return this.router
  }
}

export default new MasterRouter().getRouter()
