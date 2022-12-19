import FieldHandler from '@handlers/field.handler'
import AbstractRouter from '@routers/abstract.router'

class FieldRouter extends AbstractRouter {
  private handler =  new FieldHandler()

  constructor() {
    super()
    this.configureRoutes()
  }

  configureRoutes = (): void => {
    this.router.post('/create', this.handler.createField)
    this.router.post('/create-many', this.handler.createFieldMany)
    this.router.get('/get-all', this.handler.getAllField)
    this.router.put(
      '/edit-official-name',
      this.handler.editFieldOfficialName
    )
    this.router.post('/add-choice', this.handler.addFieldChoice)
    this.router.delete(
      '/delete-choice/:choiceId',
      this.handler.deleteFieldChoice
    )
  }
}

export default FieldRouter
