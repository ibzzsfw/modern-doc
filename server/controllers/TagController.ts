import { Request, Response } from 'express'
import Tag from '@models/Tag'
class TagController {
  createTag = async (req: Request, res: Response) => {
    Tag.addTag(req, res)
  }
  createTagMany = async (req: Request, res: Response) => {
    Tag.addTagMany(req, res)
  }

  getAllTag = async (req: Request, res: Response) => {
    Tag.getAllTag(req, res)
  }

  getTagByName = async (req: Request, res: Response) => {
    Tag.getTagByName(req, res)
  }

  getTagById = async (req: Request, res: Response) => {
    Tag.getTagById(req, res)
  }

  editTagName = async (req: Request, res: Response) => {
    Tag.editTagName(req, res)
  }
}

export default new TagController()
