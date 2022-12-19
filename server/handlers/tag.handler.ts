import { Request, Response } from 'express'
import TagController from '@controllers/tag.controller'

class TagHandler {

  private controller = new TagController()

  createTag = async (req: Request, res: Response) => {
    this.controller.addTag(req, res)
  }
  createTagMany = async (req: Request, res: Response) => {
    this.controller.addTagMany(req, res)
  }

  getAllTag = async (req: Request, res: Response) => {
    this.controller.getAllTag(req, res)
  }

  getTagByName = async (req: Request, res: Response) => {
    this.controller.getTagByName(req, res)
  }

  getTagById = async (req: Request, res: Response) => {
    this.controller.getTagById(req, res)
  }

  editTagName = async (req: Request, res: Response) => {
    this.controller.editTagName(req, res)
  }
}

export default TagHandler
