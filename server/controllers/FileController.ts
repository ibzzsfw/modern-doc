import { Request, Response } from 'express'
import File from '@models/File'
class FileController {
  getFileById = async (req: Request, res: Response) => {
    File.getFileById(req, res)
  }
  getLatestFiles = async (req: Request, res: Response) => {
    File.getLatestFiles(req, res)
  }
  searchByName = async (req: Request, res: Response) => {
    File.searchByName(req, res)
  }
  saveGenerateFile = async (req: Request, res: Response) => {
    File.newGeneratedFile(req, res)
  }
  newUploadedFile = async (req: Request, res: Response) => {
    File.newUploadedFile(req, res)
  }
  addNote = async (req: Request, res: Response) => {
    File.addNote(req, res)
  }
}

export default new FileController()
