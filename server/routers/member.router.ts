import { NextFunction, Request, Response, Router } from 'express'
import MemberHandler from '../handlers/member.handler'

class UserRouter {
  private router = Router()
  private handler = new MemberHandler()

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.get('/', this.handler.getAllMembers)
    this.router.post('/', this.handler.addMember)
    this.router.put('/:id', this.handler.editMember)
    this.router.delete('/:id', this.handler.deleteMember)
    this.router.get(
      '/available-uploadedFile/:fileId',
      this.handler.getMemberAvailableUploadedFile
    )
  }
}

export default UserRouter
