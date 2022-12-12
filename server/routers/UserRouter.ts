import { NextFunction, Request, Response, Router } from 'express'
import UserController from '@controllers/UserController'

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

    this.router.post(
      '/check-phone-password',
      this.controller.checkPhonePassword
    )

    this.router.post('/login', this.controller.login)
    this.router.post('/switch-member', this.controller.switchMember)
    this.router.get('/get-folders/:userId', this.controller.getFolders)
    this.router.get('/get-files/:userId', this.controller.getFiles)
    this.router.put('/edit-profile', this.controller.editProfile)
    this.router.post('/change-password', this.controller.changePassword)
  }
}

export default new UserRouter().getRouter()
