import { Request, Response } from 'express'
import FileService from '../services/file.service'

class FileController {

  private service = new FileService()

  async getFileById(req: Request, res: Response) {

    const { id, type } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this.service.getFileById(id, type, userId)
    res.status(response.status).json(response.json)
  }

  async getLatestFiles(req: Request, res: Response) {

    const { type } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this.service.getLatestFiles(type, userId)
    res.status(response.status).json(response.json)
  }

  async searchByName(req: Request, res: Response) {

    const { name } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this.service.searchByName(name, userId)
    res.status(response.status).json(response.json)
  }

  async getAll(req: Request, res: Response) {

    const userId = req.headers['user-id'] as string

    const response = await this.service.getAll(userId)
    res.status(response.status).json(response.json)
  }

  async newGeneratedFile(req: Request, res: Response) {

    const { fileId } = req.params
    const { fields } = req.body as {
      fields: {
        id: string
        name: string
        userValue: string
      }[]
    }
    const userId = req.headers['user-id'] as string

    const response = await this.service.newGeneratedFile(fileId, fields, userId)
    res.status(response.status).json(response.json)
  }

  async newUploadedFile(req: Request, res: Response) {

    const { fileId } = req.params
    const { URI, note, expiredDate } = req.body
    const expired: Date | null = expiredDate ? new Date(expiredDate) : null
    const userId = req.headers['user-id'] as string

    const response = await this.service.newUploadedFile(fileId, URI, note, expired, userId)
    res.status(response.status).json(response.json)
  }

  async addNote(req: Request, res: Response) {

    const { fileId, type } = req.params
    const { note } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this.service.addNote(fileId, type, note, userId)
    res.status(response.status).json(response.json)
  }

  async shareFile(req: Request, res: Response) {

    const { fileId, type } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this.service.shareFile(fileId, type, userId)
    res.status(response.status).json(response.json)
  }

  async unShareFile(req: Request, res: Response) {

    const { fileId, type } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this.service.unShareFile(fileId, type, userId)
    res.status(response.status).json(response.json)
  }

  async deleteFile(req: Request, res: Response) {

    const { fileId, type } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this.service.deleteFile(fileId, type, userId)
    res.status(response.status).json(response.json)
  }

  async newUserFreeUploadFile(req: Request, res: Response) {

    const { officialName, note, expirationDate, URI } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this.service.newUserFreeUploadFile(officialName, note, expirationDate, URI, userId)
    res.status(response.status).json(response.json)
  }


}

export default FileController