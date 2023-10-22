import IFieldController from '@contracts/controllers/field.controller'
import { Request, Response } from 'express'

class FieldHandler {

  private controller: IFieldController

  constructor(controller: IFieldController) {
    this.controller = controller
  }

  testConsoleLog = (req: Request, res: Response) => {
    this.controller.testConsoleLog()
  }

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
