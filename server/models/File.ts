import Prisma from '@utils/prisma'
import async from 'async'
import { Request, Response } from 'express'
import { z } from 'zod'
import formatGeneratedFile from '@utils/formatGeneratedFile'
import formatUploadedFile from '@utils/formatUploadedFile'

const fileType = [
  'generatedFile',
  'uploadedFile',
  'UserFreeUploadFile',
] as const

class File {
  private static async getFile(id: string, type: string, userId: string) {
    switch (type) {
      case 'generatedFile':
        return await Prisma.generatedFile.findUnique({
          where: {
            id,
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
                isRequired: true,
                field: {
                  select: {
                    name: true,
                    officialName: true,
                    description: true,
                    type: true,
                    userField: {
                      where: {
                        userId: userId,
                      },
                      select: {
                        id: true,
                        rawValue: true,
                      },
                    },
                    FieldChoice: {
                      select: {
                        name: true,
                        officialName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
      case 'uploadedFile':
        return await Prisma.uploadedFile.findUnique({
          where: {
            id,
          },
        })
      case 'UserFreeUploadFile':
        return await Prisma.userFreeUploadFile.findUnique({
          where: {
            id,
          },
        })
      default:
        return null
    }
  }

  private static async formatFile(file: any, type: string) {
    switch (type) {
      case 'generatedFile':
        return await formatGeneratedFile(file)
      case 'uploadedFile':
        return await formatUploadedFile(file)
      case 'UserFreeUploadFile':
        return file
      default:
        return null
    }
  }

  static async getFileById(req: Request, res: Response) {
    const { id, type } = req.params
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      id: z.string().uuid(),
      type: z.enum(fileType),
      userId: z.string().uuid(),
    })
    try {
      schema.parse({ id, type, userId })
      let result = await this.getFile(id, type, userId)
      let formattedResult = await this.formatFile(result, type)
      res.status(200).json(formattedResult)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }
}

export default File
