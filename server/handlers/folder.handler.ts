import { Request, Response } from 'express'
import FolderController from '@controllers/folder.controller'

class FolderHandler {

  private controller = new FolderController()

  getFolderById = async (req: Request, res: Response) => {
    this.controller.getFolderById(req, res)
  }

  getLatestFolder = async (req: Request, res: Response) => {
    this.controller.getLatestFolder(req, res)
  }

  searchByName = async (req: Request, res: Response) => {
    this.controller.searchByName(req, res)
  }

  getAll = async (req: Request, res: Response) => {
    this.controller.getAll(req, res)
  }

  addNote = async (req: Request, res: Response) => {
    this.controller.addNote(req, res)
  }

  getField = async (req: Request, res: Response) => {
    this.controller.getField(req, res)
  }

  saveFolder = async (req: Request, res: Response) => {
    this.controller.saveFolder(req, res)
  }

}

export default FolderHandler