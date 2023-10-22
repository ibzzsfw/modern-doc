import IFileService from '@contracts/services/file.service'
import { Request, Response } from 'express'
import BaseController from '.'

class FileController extends BaseController {

  private _service: IFileService

  async getFileById(req: Request, res: Response) {

    const { id, type } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this._service.getFileById(id, type, userId)
    res.status(response.status).json(response.json)
  }

  async getLatestFiles(req: Request, res: Response) {

    const { type } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this._service.getLatestFiles(type, userId)
    res.status(response.status).json(response.json)
  }

  async searchByName(req: Request, res: Response) {

    const { name } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this._service.searchByName(name, userId)
    res.status(response.status).json(response.json)
  }

  async getAll(req: Request, res: Response) {

    const userId = req.headers['user-id'] as string

    const response = await this._service.getAll(userId)
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

    const response = await this._service.newGeneratedFile(fileId, fields, userId)
    res.status(response.status).json(response.json)
  }

  async newUploadedFile(req: Request, res: Response) {

    const { fileId } = req.params
    const { URI, note, expiredDate } = req.body
    const expired: Date | null = expiredDate ? new Date(expiredDate) : null
    const userId = req.headers['user-id'] as string

    const response = await this._service.newUploadedFile(fileId, URI, note, expired, userId)
    res.status(response.status).json(response.json)
  }

  async addNote(req: Request, res: Response) {

    const { fileId, type } = req.params
    const { note } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this._service.addNote(fileId, type, note, userId)
    res.status(response.status).json(response.json)
  }

  async shareFile(req: Request, res: Response) {

    const { fileId, type } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this._service.shareFile(fileId, type, userId)
    res.status(response.status).json(response.json)
  }

  async unShareFile(req: Request, res: Response) {

    const { fileId, type } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this._service.unShareFile(fileId, type, userId)
    res.status(response.status).json(response.json)
  }

  async deleteFile(req: Request, res: Response) {

    const { fileId, type } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this._service.deleteFile(fileId, type, userId)
    res.status(response.status).json(response.json)
  }

  async newUserFreeUploadFile(req: Request, res: Response) {

    const { officialName, note, expirationDate, URI } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this._service.newUserFreeUploadFile(officialName, note, expirationDate, URI, userId)
    res.status(response.status).json(response.json)
  }

  async getFreeUploadFile(req: Request, res: Response) {

    const { fileId } = req.params

    const response = await this._service.getFreeUploadFile(fileId)
    res.status(response.status).json(response.json)
  }

  async getSharedFile(req: Request, res: Response) {

    const { fileId, type } = req.params

    const response = await this._service.getSharedFile(fileId, type)
    res.status(response.status).json(response.json)
  }


}

export default FileController