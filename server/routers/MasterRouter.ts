import { Router } from 'express'
import UserRouter from '@routers/UserRouter'
import TestRouter from '@routers/TestRouter'
import TagRouter from '@routers/TagRouter'
import FieldRouter from '@routers/FieldRouter'
import GeneratedFileRouter from '@routers/GeneratedFileRouter'
import MemberRouter from '@routers/MemberRouter'
import FileRouter from '@routers/FileRouter'
import FolderRouter from '@routers/FolderRouter'
import NoteRouter from '@routers/NoteRouter'

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
    this.router.use('/member', MemberRouter)
    this.router.use('/file', FileRouter)
    this.router.use('/folder', FolderRouter)
    this.router.use('/note', NoteRouter)
  }

  getRouter = (): Router => {
    return this.router
  }
}

export default new MasterRouter().getRouter()
