import MemberHandler from '@handlers/member.handler'
import AbstractRouter from '@routers/abstract.router'

class UserRouter extends AbstractRouter {
  private handler = new MemberHandler()

  constructor() {
    super()
    this.configureRoutes()
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
