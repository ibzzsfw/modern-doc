import { Request, Response } from 'express'
import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import checkCitizenId from '../utils/checkCitizenId'

class Tag {
  static addTag = async (req: Request, res: Response) => {
    const { name } = req.body
    const prisma = new PrismaClient()
    try {
      const tag = await prisma.tag.create({
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
    const prisma = new PrismaClient()
    try {
      const tags = await prisma.tag.findMany()
      return res.status(200).json(tags)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static getTagByName = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    try {
      const tag = await prisma.tag.findFirst({
        where: {
          name: {
            contains: req.params.name.toString(),
          },
        },
      })
      return res.status(200).json(tag)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static getTagById = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    try {
      const tag = await prisma.tag.findFirst({
        where: {
          id: req.params.id,
        },
      })
      return res.status(200).json(tag)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }
}

export default Tag
