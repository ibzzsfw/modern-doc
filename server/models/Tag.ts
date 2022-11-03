import { Request, Response } from 'express'
import { z } from 'zod'
import Prisma from '@utils/prisma'

class Tag {
  static addTag = async (req: Request, res: Response) => {
    
    const { name } = req.body
    const schema = z.string()
    try {
      schema.parse(name)
      const tag = await Prisma.tag.create({
        data: {
          name,
        },
      })
      return res.status(200).json(tag)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static getAllTag = async (req: Request, res: Response) => {
    
    try {
      const tags = await Prisma.tag.findMany()
      return res.status(200).json(tags)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static getTagByName = async (req: Request, res: Response) => {
    let { name } = req.params
    
    const schema = z.string()
    try {
      schema.parse(name)
      const tag = await Prisma.tag.findFirst({
        where: {
          name: {
            contains: name,
          },
        },
      })
      return res.status(200).json(tag)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static getTagById = async (req: Request, res: Response) => {
    
    const { id } = req.params
    const schema = z.string().uuid()
    try {
      schema.parse(id)
      const tag = await Prisma.tag.findFirst({
        where: {
          id: id,
        },
      })
      return res.status(200).json(tag)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static editTagName = async (req: Request, res: Response) => {
    const { id, name } = req.body
    
    const schema = z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
    try {
      schema.parse({ id, name })
      const editTag = await Prisma.tag.update({
        where: {
          id,
        },
        data: {
          name,
        },
      })
      return res.status(200).json(editTag)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }
}

export default Tag
