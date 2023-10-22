import IFieldController from '@contracts/controllers/field.controller'
import IFieldService from '@contracts/services/field.service'
import { Request, Response } from 'express'
import BaseController from '.'

class FieldController extends BaseController implements IFieldController {

  private _service: IFieldService

  constructor(service: IFieldService) {
    super()
    this._service = service
  }

  testConsoleLog(): void {
    this._service.testConsoleLog()
  }

  async createField(req: Request, res: Response) {

    const { name, officialName, description, type } = req.body

    const response = await this._service.createField(name, officialName, description, type)
    res.status(response.status).json(response.json)
  }

  async getAllField(req: Request, res: Response) {

    const response = await this._service.getAllField()
    res.status(response.status).json(response.json)
  }

  async createFieldMany(req: Request, res: Response) {

    const { fields } = req.body

    const response = await this._service.createFieldMany(fields)
    res.status(response.status).json(response.json)
  }

  async editFieldOfficialName(req: Request, res: Response) {

    let { id, officialName } = req.body

    const response = await this._service.editFieldOfficialName(id, officialName)
    res.status(response.status).json(response.json)
  }

  async addChoice(req: Request, res: Response) {

    let { fieldId, name, officialName } = req.body

    const response = await this._service.addChoice(fieldId, name, officialName)
    res.status(response.status).json(response.json)
  }

  async deleteChoice(req: Request, res: Response) {

    let { choiceId } = req.params

    const response = await this._service.deleteChoice(choiceId)
    res.status(response.status).json(response.json)
  }

}

export default FieldController