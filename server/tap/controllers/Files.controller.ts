import { Request, Response } from 'express'
import GeneratedFileService from "../services/GeneratedFile.service"
import UploadedFileService from "../services/UploadedFile.service"
import FreeUploadFileService from '../services/FreeUploadFile.service'

class FilesController {

  private generatedFileService = new GeneratedFileService()
  private uploadedFileService = new UploadedFileService()
  private freeUploadFileService = new FreeUploadFileService()

  getAll = async (req: Request, res: Response) => {
    let generatedFiles = await this.generatedFileService.getAll(req, res)
    let uploadedFiles = await this.uploadedFileService.getAll(req, res)
    let freeUploadFiles = await this.freeUploadFileService.getAll(req, res)
    return res.status(200).json({ generatedFiles, uploadedFiles, freeUploadFiles })
  }

  getGeneratedFiles = async (req: Request, res: Response) => {
    let generatedFiles = await this.generatedFileService.getAll(req, res)
    return res.status(200).json(generatedFiles)
  }

  getUploadedFiles = async (req: Request, res: Response) => {
    let uploadedFiles = await this.uploadedFileService.getAll(req, res)
    return res.status(200).json(uploadedFiles)
  }

  getFreeUploadFiles = async (req: Request, res: Response) => {
    let freeUploadFiles = await this.freeUploadFileService.getAll(req, res)
    return res.status(200).json(freeUploadFiles)
  }

}

export default FilesController