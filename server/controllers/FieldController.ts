import { Request, Response } from 'express'
import Field from '@models/Field'
class FieldController {
    createField = async (req: Request, res: Response) => {
        Field.createField(req, res)
    }

    getAllField = async (req: Request, res: Response) => {
        Field.getAllField(req, res)
    }

    editFieldOfficialName = async (req: Request, res: Response) => {
        Field.editFieldOfficialName(req, res)
    }
}

export default new FieldController()
