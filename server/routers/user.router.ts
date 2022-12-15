import { NextFunction, Request, Response, Router } from 'express'
import UserHandler from '@handlers/user.handler'

class UserRouter {
  private router = Router()
  private handler = new UserHandler()

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.post('/', this.handler.addUser)

    this.router.get(
      '/citizenId-status/:citizenId',
      this.handler.checkCitizenIdStatus
    )

    this.router.post(
      '/check-phone-password',
      this.handler.checkPhonePassword
    )

    this.router.post('/login', this.handler.login)
    this.router.post('/switch-member', this.handler.switchMember)
    this.router.get('/get-folders/:userId', this.handler.getFolders)
    this.router.get('/get-files/:userId', this.handler.getFiles)
    this.router.put('/edit-profile', this.handler.editProfile)
    this.router.post('/change-password', this.handler.changePassword)
  }
}

export default UserRouter
