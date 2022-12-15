import { Request, Response } from 'express';
import TagService from '@services/tag.service';

class TagController {

  private service = new TagService();

  addTag = async (req: Request, res: Response) => {

    const { name } = req.body

    const response = await this.service.addTag(name)
    res.status(response.status).json(response.json)
  }

  addTagMany = async (req: Request, res: Response) => {

    const { tags } = req.body

    const response = await this.service.addTagMany(tags)
    res.status(response.status).json(response.json)
  }

  getAllTag = async (req: Request, res: Response) => {

    const response = await this.service.getAllTag()
    res.status(response.status).json(response.json)
  }

  getTagByName = async (req: Request, res: Response) => {

    const { name } = req.params

    const response = await this.service.getTagByName(name)
    res.status(response.status).json(response.json)
  }

  getTagById = async (req: Request, res: Response) => {

    const { id } = req.params

    const response = await this.service.getTagById(id)
    res.status(response.status).json(response.json)
  }

  editTagName = async (req: Request, res: Response) => {

    const { id, name } = req.body

    const response = await this.service.editTagName(id, name)
    res.status(response.status).json(response.json)
  }

}

export default TagController