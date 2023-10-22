import IFolderService from '@contracts/services/folder.service';
import { Request, Response } from 'express';
import BaseController from '.';

class FolderController extends BaseController {

  private _service: IFolderService

  async getFolderById(req: Request, res: Response) {

    const { id } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this._service.getFolderById(id, userId)
    res.status(response.status).json(response.json)
  }

  async getLatestFolder(req: Request, res: Response) {

    const userId = req.headers['user-id'] as string

    const response = await this._service.getLatestFolder(userId)
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

  async addNote(req: Request, res: Response) {

    const { userFolderId } = req.params
    const { note } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this._service.addNote(userFolderId, note, userId)
    res.status(response.status).json(response.json)
  }

  async getField(req: Request, res: Response) {

    const generatedFileIds = JSON.parse(
      req.headers['generated-file-ids'] as string
    )
    const userId = req.headers['user-id'] as string

    const response = await this._service.getField(generatedFileIds, userId)
    res.status(response.status).json(response.json)
  }

  async saveFolder(req: Request, res: Response) {

    const { folderId } = req.params
    const { fields, generatedFiles } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this._service.saveFolder(
      folderId,
      fields,
      generatedFiles,
      userId
    )
    res.status(response.status).json(response.json)
  }

}

export default FolderController