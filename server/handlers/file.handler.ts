import { Request, Response } from 'express'
import FileController from '../controllers/file.controller'

class FileHandler {

  private controller = new FileController()

  getFileById = async (req: Request, res: Response) => {
    this.controller.getFileById(req, res)
  }

  getLatestFiles = async (req: Request, res: Response) => {
    this.controller.getLatestFiles(req, res)
  }

  searchByName = async (req: Request, res: Response) => {
    this.controller.searchByName(req, res)
  }

  getAll = async (req: Request, res: Response) => {
    this.controller.getAll(req, res)
  }

  newGeneratedFile = async (req: Request, res: Response) => {
    this.controller.newGeneratedFile(req, res)
  }

  newUploadedFile = async (req: Request, res: Response) => {
    this.controller.newUploadedFile(req, res)
  }

  addNote = async (req: Request, res: Response) => {
    this.controller.addNote(req, res)
  }

  shareFile = async (req: Request, res: Response) => {
    this.controller.shareFile(req, res)
  }

  unShareFile = async (req: Request, res: Response) => {
    this.controller.unShareFile(req, res)
  }

  deleteFile = async (req: Request, res: Response) => {
    this.controller.deleteFile(req, res)
  }

  newUserFreeUploadFile = async (req: Request, res: Response) => {
    this.controller.newUserFreeUploadFile(req, res)
  }
  
  getFreeUploadFile = async (req: Request, res: Response) => {
    this.controller.getFreeUploadFile(req, res)
  }

  getSharedFile = async (req: Request, res: Response) => {
    this.controller.getSharedFile(req, res)
  }
}

export default FileHandler
