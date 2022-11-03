import { Request, Response } from 'express'
import GeneratedFile from '@models/GeneratedFile'
class UserController {
  create = async (req: Request, res: Response) => {
    GeneratedFile.create(req, res)
  }
  getAll = async (req: Request, res: Response) => {
    GeneratedFile.getAll(req, res)
  }
  addTag = async (req: Request, res: Response) => {
    GeneratedFile.addTag(req, res)
  }
  deleteTag = async (req: Request, res: Response) => {
    GeneratedFile.deleteTag(req, res)
  }
  getById = async (req: Request, res: Response) => {
    GeneratedFile.getById(req, res)
  }

  addField = async (req: Request, res: Response) => {
    GeneratedFile.addField(req, res)
  }
  deleteField = async (req: Request, res: Response) => {
    GeneratedFile.deleteField(req, res)
  }
}

export default new UserController()
