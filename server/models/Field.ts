import { Request, Response } from 'express'
import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import checkCitizenId from '../utils/checkCitizenId'

class Field {
  static async createField(req: Request, res: Response) {
    const prisma = new PrismaClient()
    const { name, officialName, description, type } = req.body
    try {
      const field = await prisma.field.create({
        data: {
          name,
          officialName,
          description,
          type,
        },
      })
      return res.status(200).json(field)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async getAllField(req: Request, res: Response) {
    const prisma = new PrismaClient()
    try {
      const fields = await prisma.field.findMany()
      return res.status(200).json(fields)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async editFieldOfficialName(req: Request, res: Response) {
    let { id, officialName } = req.body
    const prisma = new PrismaClient()
    try {
      const editField = await prisma.field.update({
        where: {
          id,
        },
        data: {
          officialName,
        },
      })
      return res.status(200).json(editField)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }
}

export default Field
