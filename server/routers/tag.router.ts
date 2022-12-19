import TagHandler from '@handlers/tag.handler'
import AbstractRouter from '@routers/abstract.router'

class UserRouter extends AbstractRouter{
  private handler = new TagHandler()

  constructor() {
    super()
    this.configureRoutes()
  }

  configureRoutes = (): void => {
    this.router.get('/get-all', this.handler.getAllTag)
    this.router.post('/create', this.handler.createTag)
    this.router.post('/create-many', this.handler.createTagMany)
    this.router.get('/name/:name', this.handler.getTagByName)
    this.router.get('/id/:id', this.handler.getTagById)
    this.router.put('/edit-name', this.handler.editTagName)
  }
}

export default UserRouter