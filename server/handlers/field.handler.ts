import { Request, Response } from 'express'
import FieldController from '@controllers/field.controller'

class FieldHandler {

  private controller = new FieldController()
  
  createField = async (req: Request, res: Response) => {
    this.controller.createField(req, res)
  }
  
  createFieldMany = async (req: Request, res: Response) => {
    this.controller.createFieldMany(req, res)
  }

  getAllField = async (req: Request, res: Response) => {
    this.controller.getAllField(req, res)
  }

  editFieldOfficialName = async (req: Request, res: Response) => {
    this.controller.editFieldOfficialName(req, res)
  }

  addFieldChoice = async (req: Request, res: Response) => {
    this.controller.addChoice(req, res)
  }

  deleteFieldChoice = async (req: Request, res: Response) => {
    this.controller.deleteChoice(req, res)
  }
}

export default FieldHandler
