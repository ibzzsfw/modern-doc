import ITagService from '@services/interfaces/tag.service';
import { Request, Response } from 'express';

class TagController {

  private _service: ITagService

  addTag = async (req: Request, res: Response) => {

    const { name } = req.body

    const response = await this._service.addTag(name)
    res.status(response.status).json(response.json)
  }

  addTagMany = async (req: Request, res: Response) => {

    const { tags } = req.body

    const response = await this._service.addTagMany(tags)
    res.status(response.status).json(response.json)
  }

  getAllTag = async (req: Request, res: Response) => {

    const response = await this._service.getAllTag()
    res.status(response.status).json(response.json)
  }

  getTagByName = async (req: Request, res: Response) => {

    const { name } = req.params

    const response = await this._service.getTagByName(name)
    res.status(response.status).json(response.json)
  }

  getTagById = async (req: Request, res: Response) => {

    const { id } = req.params

    const response = await this._service.getTagById(id)
    res.status(response.status).json(response.json)
  }

  editTagName = async (req: Request, res: Response) => {

    const { id, name } = req.body

    const response = await this._service.editTagName(id, name)
    res.status(response.status).json(response.json)
  }

}

export default TagController