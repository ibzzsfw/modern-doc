import { PrismaClient } from '@prisma/client'
import async from 'async'
import { Request, Response } from 'express'
import { z } from 'zod'

class GeneratedFile {
  static async create(req: Request, res: Response) {
    const prisma = new PrismaClient()
    const { name, officialName, description, dayLifeSpan, URI } = req.body
    const schema = z.object({
      name: z.string(),
      officialName: z.string(),
      description: z.string(),
      dayLifeSpan: z.number().min(-1),
      URI: z.string().url(),
    })
    try {
      schema.parse({ name, officialName, description, dayLifeSpan, URI })
      const file = await prisma.generatedFile.create({
        data: {
          name,
          officialName,
          description,
          dayLifeSpan,
          URI,
        },
      })
      return res.status(200).json(file)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async getAll(req: Request, res: Response) {
    const prisma = new PrismaClient()
    try {
      const files = await prisma.generatedFile.findMany()
      return res.status(200).json(files)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async addTag(req: Request, res: Response) {
    const prisma = new PrismaClient()
    const { generatedFileId, tagId } = req.body
    const schema = z.object({
      generatedFileId: z.string().uuid(),
      tagId: z.string().uuid(),
    })
    try {
      schema.parse({ generatedFileId, tagId })
      const addTag = await prisma.generatedFileTag.create({
        data: {
          generatedFileId,
          tagId,
        },
      })
      return res.status(200).json(addTag)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async deleteTag(req: Request, res: Response) {
    const prisma = new PrismaClient()
    const { generatedFileId, tagId } = req.params
    const schema = z.object({
      generatedFileId: z.string().uuid(),
      tagId: z.string().uuid(),
    })
    try {
      schema.parse({ generatedFileId, tagId })
      const removeTag = await prisma.generatedFileTag.deleteMany({
        where: {
          generatedFileId,
          tagId,
        },
      })
      return res.status(200).json(removeTag)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async getById(req: Request, res: Response) {
    const prisma = new PrismaClient()
    const { id } = req.params
    const schema = z.string().uuid()
    try {
      schema.parse(id)
      const file = await prisma.generatedFile.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          officialName: true,
          description: true,
          dayLifeSpan: true,
          URI: true,
          generatedFileTag: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          GeneratedFileField: {
            select: {
              field: {
                select: {
                  name: true,
                  officialName: true,
                  description: true,
                  type: true,
                },
              },
            },
          },
        },
      })

      let tagArr = await async.map(
        file.generatedFileTag,
        (tag: any, callback: any) => {
          callback(null, tag.tag)
        }
      )

      let fieldArr = await async.map(
        file.GeneratedFileField,
        (field: any, callback: any) => {
          callback(null, field.field)
        }
      )

      let result = {
        id: file.id,
        name: file.name,
        officialName: file.officialName,
        description: file.description,
        dayLifeSpan: file.dayLifeSpan,
        URI: file.URI,
        tags: tagArr,
        fields: fieldArr,
      }

      return res.status(200).json(result)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async addField(req: Request, res: Response) {
    const prisma = new PrismaClient()
    const { generatedFileId, fieldId } = req.body
    const schema = z.object({
      generatedFileId: z.string().uuid(),
      fieldId: z.string().uuid(),
    })
    try {
      schema.parse({ generatedFileId, fieldId })
      const addField = await prisma.generatedFileField.create({
        data: {
          generatedFileId,
          fieldId,
        },
      })
      return res.status(200).json(addField)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async deleteField(req: Request, res: Response) {
    const prisma = new PrismaClient()
    const { generatedFileId, fieldId } = req.params
    const schema = z.object({
      generatedFileId: z.string().uuid(),
      fieldId: z.string().uuid(),
    })
    try {
      schema.parse({ generatedFileId, fieldId })
      const removeField = await prisma.generatedFileField.deleteMany({
        where: {
          generatedFileId,
          fieldId,
        },
      })
      return res.status(200).json(removeField)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }
}

export default GeneratedFile
