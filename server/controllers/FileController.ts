import { Request, Response } from 'express'
import File from '@models/File'
class FileController {
  getFileById = async (req: Request, res: Response) => {
    File.getFileById(req, res)
  }
  getLatestFiles = async (req: Request, res: Response) => {
    File.getLatestFiles(req, res)
  }
}

export default new FileController()
