import FieldRouter from '@routers/field.router'
import FileRouter from '@routers/file.router'
import FolderRouter from '@routers/folder.router'
import MemberRouter from '@routers/member.router'
import NoteRouter from '@routers/note.router'
import TagRouter from '@routers/tag.router'
import UserRouter from '@routers/user.router'
import AbstractRouter from '@routers/abstract.router'

class MasterRouter extends AbstractRouter {
  private UserRouter = new UserRouter().getRouter()
  private TagRouter = new TagRouter().getRouter()
  private NoteRouter = new NoteRouter().getRouter()
  private FileRouter = new FileRouter().getRouter()
  private FieldRouter = new FieldRouter().getRouter()
  private FolderRouter = new FolderRouter().getRouter()
  private MemberRouter = new MemberRouter().getRouter()

  constructor() {
    super()
    this.configureRoutes()
  }

  configureRoutes = (): void => {
    this.router.use('/user', this.UserRouter)
    this.router.use('/tag', this.TagRouter)
    this.router.use('/field', this.FieldRouter)
    this.router.use('/member', this.MemberRouter)
    this.router.use('/file', this.FileRouter)
    this.router.use('/folder', this.FolderRouter)
    this.router.use('/note', this.NoteRouter)
  }
}

export default new MasterRouter().getRouter()
