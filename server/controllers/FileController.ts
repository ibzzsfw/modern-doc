import { Request, Response } from 'express'
import File from '@models/File'
class FileController {
  getFileById = async (req: Request, res: Response) => {
    File.getFileById(req, res)
  }
}

export default new FileController()
