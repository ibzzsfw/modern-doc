import { Request, Response } from 'express'
import { z } from 'zod'
import Prisma from '@utils/prisma'

class Field {
  static async createField(req: Request, res: Response) {
    const { name, officialName, description, type } = req.body
    const schema = z.object({
      name: z.string(),
      officialName: z.string(),
      description: z.string(),
      type: z.enum([
        'text',
        'number',
        'date',
        'singleSelect',
        'multipleSelect',
      ]),
    })
    try {
      schema.parse({ name, officialName, description, type })
      const field = await Prisma.field.create({
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
    try {
      const fields = await Prisma.field.findMany()
      return res.status(200).json(fields)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async editFieldOfficialName(req: Request, res: Response) {
    let { id, officialName } = req.body
    const schema = z.object({
      id: z.string().uuid(),
      officialName: z.string(),
    })
    try {
      schema.parse({ id, officialName })
      const editField = await Prisma.field.update({
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

  static async addChoice(req: Request, res: Response) {
    let { fieldId, name, officialName } = req.body
    const schema = z.object({
      fieldId: z.string().uuid(),
      name: z.string(),
      officialName: z.string(),
    })
    try {
      schema.parse({
        fieldId,
        name,
        officialName,
      })
      const checkType = await Prisma.field.findUnique({
        where: {
          id: fieldId,
        },
      })
      if (
        checkType.type !== 'singleSelect' &&
        checkType.type !== 'multipleSelect'
      ) {
        return res
          .status(500)
          .json({ message: 'This field is not a select field' })
      }
      const addChoice = await Prisma.fieldChoice.create({
        data: {
          fieldId: fieldId,
          name: name,
          officialName: officialName,
        },
      })
      return res.status(200).json(addChoice)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  static async deleteChoice(req: Request, res: Response) {
    let { choiceId } = req.params
    const schema = z.string().uuid()
    try {
      schema.parse(choiceId)
      const deleteChoice = await Prisma.fieldChoice.delete({
        where: {
          id: choiceId,
        },
      })
      return res.status(200).json(deleteChoice)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }
}

export default Field
