import { Request, Response } from 'express'
import FieldService from "@services/field.service"

class FieldController {

  private service = new FieldService()


  async createField(req: Request, res: Response) {

    const { name, officialName, description, type } = req.body

    const response = await this.service.createField(name, officialName, description, type)
    res.status(response.status).json(response.json)
  }

  async getAllField(req: Request, res: Response) {

    const response = await this.service.getAllField()
    res.status(response.status).json(response.json)
  }

  async createFieldMany(req: Request, res: Response) {

    const { fields } = req.body

    const response = await this.service.createFieldMany(fields)
    res.status(response.status).json(response.json)
  }

  async editFieldOfficialName(req: Request, res: Response) {

    let { id, officialName } = req.body

    const response = await this.service.editFieldOfficialName(id, officialName)
    res.status(response.status).json(response.json)
  }

  async addChoice(req: Request, res: Response) {

    let { fieldId, name, officialName } = req.body

    const response = await this.service.addChoice(fieldId, name, officialName)
    res.status(response.status).json(response.json)
  }

  async deleteChoice(req: Request, res: Response) {

    let { choiceId } = req.params

    const response = await this.service.deleteChoice(choiceId)
    res.status(response.status).json(response.json)
  }

}

export default FieldController