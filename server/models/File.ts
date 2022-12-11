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
          SELECT DISTINCT (jsonb_build_object(
              'id', "Tag"."id",
              'name', "Tag"."name"
            ))
              FROM "GeneratedFileTag"
              LEFT JOIN "Tag" ON "Tag"."id" = "GeneratedFileTag"."tagId"
           	  WHERE "GeneratedFileTag"."generatedFileId" = ${id}::uuid
           ) AS "tags",
        (
          SELECT date FROM "UserGeneratedFile" WHERE "UserGeneratedFile"."generatedFileId" = ${id}::uuid
          AND "UserGeneratedFile"."userId" = ${userId}::uuid
        ) AS "date",
        (
          SELECT note FROM "UserGeneratedFile" WHERE "UserGeneratedFile"."generatedFileId" = ${id}::uuid
          AND "UserGeneratedFile"."userId" = ${userId}::uuid
        ) AS "note",
        array(
          SELECT DISTINCT jsonb_build_object(
            'id', "Field"."id",
            'generatedFileId', "GeneratedFileField"."generatedFileId",
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
          WHERE "GeneratedFileField"."generatedFileId" = ${id}::uuid
          AND ("UserField"."userId" = ${userId}::uuid OR "UserField"."userId" IS NULL)
        ) AS "fields" FROM "GeneratedFile" WHERE id = ${id}::uuid
        `
      }
      case 'uploadedFile': {
        return await Prisma.$queryRaw`
          SELECT "UploadedFile".*, "UserUploadedFile"."URI",
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
          ON ("UserUploadedFile"."uploadedFileId" = "UploadedFile"."id"
          AND "UserUploadedFile"."userId" = ${userId}::uuid
          )
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
      res.status(200).json({ ...result[0], type: type })
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

  static async newGeneratedFile(req: Request, res: Response) {
    console.log('man')
    const { fileId } = req.params
    const { fields } = req.body as {
      fields: {
        id: string
        name: string
        userValue: string
      }[]
    }
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      fields: z.array(
        z.object({
          id: z.string().uuid(),
          name: z.string(),
          userValue: z.string(),
        })
      ),
      fileId: z.string().uuid(),
      userId: z.string().uuid(),
    })

    try {
      schema.parse({ fields, fileId, userId })
      const updateUserGeneratedFile = await Prisma.$queryRaw`
        INSERT INTO "UserGeneratedFile" ( "id","userId", "generatedFileId", "date")
        VALUES ((SELECT gen_random_uuid()),${userId}::uuid, ${fileId}::uuid, ${new Date()})
        ON CONFLICT ("userId", "generatedFileId") DO UPDATE SET "date" = ${new Date()}
      `
      console.log(fields)
      const promise = await async.map(fields, async (field) => {
        const { name, userValue } = field
        const updateField = await Prisma.$queryRaw`
          INSERT INTO "UserField" ("id","userId","fieldId","rawValue","date")
          VALUES (
          (SELECT gen_random_uuid())
          ,
          ${userId}::uuid, ${field.id}::uuid, ${userValue}, ${new Date()})
          ON CONFLICT ("userId", "fieldId") DO UPDATE SET "rawValue" = ${userValue}, "date" = ${new Date()}
        `
        return updateField
      })
      await Promise.all(promise)
      res.status(200).json({ message: 'success' })
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static async newUploadedFile(req: Request, res: Response) {
    console.log('here')
    const { fileId } = req.params
    const { URI, note, expiredDate } = req.body
    const expired = expiredDate ? new Date(expiredDate) : null
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      fileId: z.string().uuid(),
      URI: z.string().url(),
      userId: z.string().uuid(),
      note: z.string().optional(),
    })
    try {
      schema.parse({ fileId, URI, userId })
      const result = await Prisma.$queryRaw`
        INSERT INTO "UserUploadedFile" ("id","userId","uploadedFileId","URI","isShared"
        ,"note","expirationDate","date")
        VALUES ((SELECT gen_random_uuid()),${userId}::uuid, ${fileId}::uuid, ${URI}, false, ${note}, ${expired}, ${new Date()})
        ON CONFLICT ("userId", "uploadedFileId") DO UPDATE SET "URI" = ${URI}, "date" = ${new Date()}, "note" = ${note}, "expirationDate" = ${expired}
      `
      res.status(200).json({ message: 'success' })
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static addNote = async (req: Request, res: Response) => {
    const { id, type } = req.params
    const { note } = req.body
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      id: z.string().uuid(),
      type: z.enum(fileType),
      userId: z.string().uuid(),
      note: z.string(),
    })
    try {
      schema.parse({ id, type, userId, note })
      switch (type) {
        case 'generatedFile': {
          const result = await Prisma.$queryRaw`
            UPDATE "UserGeneratedFile" SET "note" = ${note} 
            WHERE "generatedFileId" = ${id}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
        case 'uploadedFile': {
          const result = await Prisma.$queryRaw`
            UPDATE "UserUploadedFile" SET "note" = ${note}
            WHERE "uploadedFileId" = ${id}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
        case 'userFreeUploadFile': {
          const result = await Prisma.$queryRaw`
            UPDATE "UserFreeUploadFile" SET "note" = ${note}
            WHERE "id" = ${id}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
      }
    } catch (err) {
      res.status(400).json(err)
    }
  }
}

export default File
