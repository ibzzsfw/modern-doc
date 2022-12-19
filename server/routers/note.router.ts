import NoteHandler from '@handlers/note.handler'
import AbstractRouter from '@routers/abstract.router'

class NoteRouter extends AbstractRouter {
  private handler = new NoteHandler()

  constructor() {
    super()
    this.configureRoutes()
  }

  configureRoutes = (): void => {
    this.router.post('/add', this.handler.addFreeNote)
    this.router.put('/edit/:noteId', this.handler.editNote)
    this.router.delete('/delete/:noteId', this.handler.deleteNote)
    this.router.get('/all', this.handler.getAllNote)
  }
}

export default NoteRouter
