import { Request, Response } from 'express'
import Folder from '@models/Folder'
class FolderController {
  getFolderById = async (req: Request, res: Response) => {
    Folder.getFolderById(req, res)
  }
  getLatestFolder = async (req: Request, res: Response) => {
    Folder.getLatestFolder(req, res)
  }
}

export default new FolderController()
