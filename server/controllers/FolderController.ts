import { Request, Response } from 'express'
import Folder from '@models/Folder'
class FolderController {
  getFolderById = async (req: Request, res: Response) => {
    Folder.getFolderById(req, res)
  }
  getLatestFolder = async (req: Request, res: Response) => {
    Folder.getLatestFolder(req, res)
  }
  searchByName = async (req: Request, res: Response) => {
    Folder.searchByName(req, res)
  }
  getAll = async (req: Request, res: Response) => {
    Folder.getAll(req, res)
  }
  addNote = async (req: Request, res: Response) => {
    Folder.addNote(req, res)
  }
  getField = async (req: Request, res: Response) => {
    Folder.getField(req, res)
  }
  saveFolder = async (req: Request, res: Response) => {
    Folder.saveFolder(req, res)
  }
}

export default new FolderController()
