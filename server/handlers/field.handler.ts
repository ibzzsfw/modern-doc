import { Request, Response } from 'express'
import Field from '@models/Field'

class FieldHandler {
  
  createField = async (req: Request, res: Response) => {
    Field.createField(req, res)
  }
  
  createFieldMany = async (req: Request, res: Response) => {
    Field.createFieldMany(req, res)
  }

  getAllField = async (req: Request, res: Response) => {
    Field.getAllField(req, res)
  }

  editFieldOfficialName = async (req: Request, res: Response) => {
    Field.editFieldOfficialName(req, res)
  }

  addFieldChoice = async (req: Request, res: Response) => {
    Field.addChoice(req, res)
  }

  deleteFieldChoice = async (req: Request, res: Response) => {
    Field.deleteChoice(req, res)
  }
}

export default FieldHandler
