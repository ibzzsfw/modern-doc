import Prisma from '@utils/prisma'
import async from 'async'
import { Request, Response } from 'express'
import { z } from 'zod'
import formatGeneratedFile from '@utils/formatGeneratedFile'
import formatUploadedFile from '@utils/formatUploadedFile'

const fileType = [
  'generatedFile',
  'uploadedFile',
  'userFreeUploadFile',
] as const

class File {
  private static async getFile(id: string, type: string, userId: string) {
    switch (type) {
      case 'generatedFile': {
        return await Prisma.$queryRaw`
        SELECT *,
        array(
          SELECT (json_build_object(
              'id', "Tag"."id",
              'name', "Tag"."name"
            ))
              FROM "GeneratedFileTag"
              LEFT JOIN "Tag" ON "Tag"."id" = "GeneratedFileTag"."tagId"
           	  WHERE "GeneratedFileTag"."generatedFileId" = ${id}::uuid
           ) AS "tags",
        array(
          SELECT json_build_object(
            'id', "Field"."id",
            'name', "Field"."name",
            'type', "Field"."type",
            'description', "Field"."description",
            'officialName', "Field"."officialName",
            'isRequired', "GeneratedFileField"."isRequired",
            'userValue', "UserField"."rawValue",
            'date', "UserField"."date",
            'fieldChoice',(SELECT json_agg(json_build_object(
              'name', "FieldChoice"."name",
              'officialName', "FieldChoice"."officialName"
            ))
              FROM "FieldChoice"
           	  WHERE "FieldChoice"."fieldId" = "Field"."id"
           )
          )
          FROM "GeneratedFileField" 
          LEFT JOIN "Field" ON "Field"."id" = "GeneratedFileField"."fieldId"
          LEFT JOIN "UserField" ON "UserField"."fieldId" = "Field"."id" 
          WHERE "GeneratedFileField"."generatedFileId" = "GeneratedFile"."id"
        ) AS "fields" FROM "GeneratedFile" WHERE id = ${id}::uuid
        `
      }
      case 'uploadedFile': {
        return await Prisma.$queryRaw`
          SELECT "UploadedFile".*, "UserUploadedFile"."URI" as "userURI",
          "UserUploadedFile"."date",
          "UserUploadedFile"."expirationDate",
          array(
          SELECT (json_build_object(
              'id', "Tag"."id",
              'name', "Tag"."name"
            ))
              FROM "UploadedFileTag"
              LEFT JOIN "Tag" ON "Tag"."id" = "UploadedFileTag"."tagId"
           	  WHERE "UploadedFileTag"."uploadedFileId" = ${id}::uuid
           ) AS "tags"
          FROM "UploadedFile" 
          LEFT JOIN "UserUploadedFile" 
          ON "UserUploadedFile"."uploadedFileId" = "UploadedFile"."id"
          WHERE "UploadedFile"."id" = ${id}::uuid
        `
      }
      case 'userFreeUploadFile': {
        return await Prisma.$queryRaw`
            SELECT * FROM "UserFreeUploadFile"
            WHERE "id" = ${id}::uuid
          `
      }
      default:
        return null
    }
  }

  private static async getLatestFile(type: string, userId: string) {
    switch (type) {
      case 'generatedFile':
        return await Prisma.userGeneratedFile.findMany({
          where: {
            userId,
          },
          orderBy: {
            date: 'desc',
          },
          take: 3,
          select: {
            date: true,
            generatedFile: {
              select: {
                id: true,
                name: true,
                officialName: true,
                description: true,
              },
            },
          },
        })

      case 'uploadedFile':
        return await Prisma.userUploadedFile.findMany({
          where: {
            userId,
          },
          orderBy: {
            date: 'desc',
          },
          take: 3,
          select: {
            date: true,
            uploadedFile: {
              select: {
                id: true,
                name: true,
                officialName: true,
                description: true,
              },
            },
          },
        })
      default:
        return await Prisma.userFreeUploadFile.findMany({
          where: {
            userId,
          },
          orderBy: {
            date: 'desc',
          },
          take: 3,
          select: {
            date: true,
            officialName: true,
            note: true,
          },
        })
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
      res.status(200).json(result[0])
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async getLatestFiles(req: Request, res: Response) {
    const { type } = req.params
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      type: z.enum(fileType),
      userId: z.string().uuid(),
    })
    try {
      schema.parse({ type, userId })
      let result = await this.getLatestFile(type, userId)
      let formattedResult = await async.map(result, (file, callback) => {
        callback(null, {
          ...file,
          ...file[type],
          [type]: undefined,
          type: type,
        })
      })
      res.status(200).json(formattedResult)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async searchByName(req: Request, res: Response) {
    const { name } = req.params
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      name: z.string(),
      userId: z.string().uuid(),
    })

    try {
      schema.parse({ name, userId })
      const file = await Prisma.$queryRaw`
        SELECT "GeneratedFile".*, 'generatedFile' as "type" FROM "GeneratedFile"
        LEFT JOIN "GeneratedFileTag" ON "GeneratedFileTag"."generatedFileId" = "GeneratedFile"."id"
        LEFT JOIN "Tag" ON "Tag"."id" = "GeneratedFileTag"."tagId"
        WHERE "GeneratedFile"."name" ILIKE ${`%${name}%`} OR "Tag"."name" ILIKE ${`%${name}%`}
        UNION
        SELECT "UploadedFile".*, 'uploadedFile' as "type" FROM "UploadedFile"
        LEFT JOIN "UploadedFileTag" ON "UploadedFileTag"."uploadedFileId" = "UploadedFile"."id"
        LEFT JOIN "Tag" ON "Tag"."id" = "UploadedFileTag"."tagId"
        WHERE "UploadedFile"."name" ILIKE ${`%${name}%`} OR "Tag"."name" ILIKE ${`%${name}%`}
        UNION
        SELECT "UserFreeUploadFile"."id","UserFreeUploadFile"."officialName",null as "name","UserFreeUploadFile"."URI",null as "description",null as "dayLifeSpan",'userFreeUploadFile' as "type" FROM "UserFreeUploadFile"
        WHERE "UserFreeUploadFile"."officialName" ILIKE ${`%${name}%`} AND "UserFreeUploadFile"."userId" = ${userId}::uuid
      `
      res.status(200).json(file)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}

export default File
