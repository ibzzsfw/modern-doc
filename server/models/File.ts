import Prisma from '@utils/prisma'
import async from 'async'
import { Request, Response } from 'express'
import { z } from 'zod'
import formatGeneratedFile from '@utils/formatGeneratedFile'
import formatUploadedFile from '@utils/formatUploadedFile'
import Member from '@models/Member'

const fileType = [
  'generatedFile',
  'uploadedFile',
  'userFreeUploadFile',
  'sharedFile',
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
           ),
           'order', "GeneratedFileField"."order"
          )
          FROM "GeneratedFileField" 
          LEFT JOIN "Field" ON "Field"."id" = "GeneratedFileField"."fieldId"
          LEFT JOIN "UserField" ON ("UserField"."fieldId" = "Field"."id"
              AND "UserField"."userId" = ${userId}::uuid 
          )
          WHERE "GeneratedFileField"."generatedFileId" = ${id}::uuid
        ) AS "fields" FROM "GeneratedFile" WHERE id = ${id}::uuid
        `
      }
      case 'uploadedFile': {
        return await Prisma.$queryRaw`
          SELECT "UploadedFile".*, "UserUploadedFile"."URI",
          "UploadedFile"."URI" AS "previewURI",
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
          select: {
            date: true,
            note: true,
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
          select: {
            date: true,
            isShared: true,
            note: true,
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

      case 'sharedFile':
        const user = await Prisma.user.findUnique({
          where: { id: userId },
          select: { householdId: true },
        })
        const householdId = user.householdId

        return await Prisma.$queryRaw`
          SELECT "UserUploadedFile"."isShared",
          "UserUploadedFile"."date", "UserUploadedFile"."note",  
          "UploadedFile"."name",
          "UploadedFile"."officialName", "UploadedFile"."description",
          "UserUploadedFile"."id" ,
          "User"."firstName", "User"."lastName",
          'uploadedFile' AS "type" 
          FROM "UserUploadedFile"
          LEFT JOIN "UploadedFile" ON "UploadedFile"."id" = "UserUploadedFile"."uploadedFileId"
          LEFT JOIN "User" ON "User"."id" = "UserUploadedFile"."userId"
          WHERE "User"."householdId" = ${householdId}::uuid
          AND "UserUploadedFile"."isShared" = true
          UNION 
          SELECT "UserFreeUploadFile"."isShared",
          "UserFreeUploadFile"."date", "UserFreeUploadFile"."note",
          NULL AS "name", "UserFreeUploadFile"."officialName",
          NULL AS "description", "UserFreeUploadFile"."id",
          "User"."firstName", "User"."lastName", 
          'userFreeUploadFile' AS "type" 
          FROM "UserFreeUploadFile"
          LEFT JOIN "User" ON "User"."id" = "UserFreeUploadFile"."userId"
          WHERE "User"."householdId" = ${householdId}::uuid
          AND "UserFreeUploadFile"."isShared" = true
        `

      default:
        return await Prisma.userFreeUploadFile.findMany({
          where: {
            userId,
          },
          orderBy: {
            date: 'desc',
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
      if (type === 'generatedFile') {
        result[0].fields.sort((a: any, b: any) => a.order - b.order)
        res.status(200).json({ ...result[0], type: type })
      } else res.status(200).json({ ...result[0], type: type })
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
        SELECT "GeneratedFile".*, 'generatedFile' as "type",
        "UserGeneratedFile"."date" as "date"
         FROM "GeneratedFile"
        LEFT JOIN "GeneratedFileTag" ON "GeneratedFileTag"."generatedFileId" = "GeneratedFile"."id"
        LEFT JOIN "Tag" ON "Tag"."id" = "GeneratedFileTag"."tagId"
        LEFT JOIN "UserGeneratedFile" ON ("UserGeneratedFile"."generatedFileId" = "GeneratedFile"."id"
        AND "UserGeneratedFile"."userId" = ${userId}::uuid)
        WHERE "GeneratedFile"."officialName" ILIKE ${`%${name}%`} OR "Tag"."name" ILIKE ${`%${name}%`}
        UNION
        SELECT "UploadedFile".*, 'uploadedFile' as "type",
        "UserUploadedFile"."date" as "date"
         FROM "UploadedFile"
        LEFT JOIN "UploadedFileTag" ON "UploadedFileTag"."uploadedFileId" = "UploadedFile"."id"
        LEFT JOIN "Tag" ON "Tag"."id" = "UploadedFileTag"."tagId"
        LEFT JOIN "UserUploadedFile" ON ("UserUploadedFile"."uploadedFileId" = "UploadedFile"."id"
        AND "UserUploadedFile"."userId" = ${userId}::uuid)
        WHERE "UploadedFile"."officialName" ILIKE ${`%${name}%`} OR "Tag"."name" ILIKE ${`%${name}%`}
        UNION
        SELECT "UserFreeUploadFile"."id","UserFreeUploadFile"."officialName",null as "name","UserFreeUploadFile"."URI"
        ,null as "description",null as "dayLifeSpan",'userFreeUploadFile' as "type",
        "UserFreeUploadFile"."date" as "date"
         FROM "UserFreeUploadFile"
        WHERE "UserFreeUploadFile"."officialName" ILIKE ${`%${name}%`} AND "UserFreeUploadFile"."userId" = ${userId}::uuid
      `
      res.status(200).json(file)
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static async getAll(req: Request, res: Response) {
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      userId: z.string().uuid(),
    })

    try {
      schema.parse({ userId })
      const file = await Prisma.$queryRaw`
        SELECT "GeneratedFile".*, 'generatedFile' as "type",
        "UserGeneratedFile"."date"
        FROM "GeneratedFile"
        LEFT JOIN "GeneratedFileTag" ON "GeneratedFileTag"."generatedFileId" = "GeneratedFile"."id"
        LEFT JOIN "Tag" ON "Tag"."id" = "GeneratedFileTag"."tagId"
        LEFT JOIN "UserGeneratedFile" ON ("UserGeneratedFile"."generatedFileId" = "GeneratedFile"."id"
        AND "UserGeneratedFile"."userId" = ${userId}::uuid)
        UNION
        SELECT "UploadedFile".*, 'uploadedFile' as "type",
        "UserUploadedFile"."date"
         FROM "UploadedFile"
        LEFT JOIN "UploadedFileTag" ON "UploadedFileTag"."uploadedFileId" = "UploadedFile"."id"
        LEFT JOIN "Tag" ON "Tag"."id" = "UploadedFileTag"."tagId"
        LEFT JOIN "UserUploadedFile" ON ("UserUploadedFile"."uploadedFileId" = "UploadedFile"."id"
        AND "UserUploadedFile"."userId" = ${userId}::uuid)
        UNION
        SELECT "UserFreeUploadFile"."id","UserFreeUploadFile"."officialName",null as "name","UserFreeUploadFile"."URI"
        ,null as "description",null as "dayLifeSpan",'userFreeUploadFile' as "type",
        "UserFreeUploadFile"."date" as "date"
         FROM "UserFreeUploadFile"
        WHERE "UserFreeUploadFile"."userId" = ${userId}::uuid
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
    const { fileId, type } = req.params
    const { note } = req.body
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      fileId: z.string().uuid(),
      type: z.enum(fileType),
      userId: z.string().uuid(),
      note: z.string(),
    })
    try {
      schema.parse({ fileId, type, userId, note })
      switch (type) {
        case 'generatedFile': {
          const result = await Prisma.$queryRaw`
            UPDATE "UserGeneratedFile" SET "note" = ${note} 
            WHERE "generatedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
        case 'uploadedFile': {
          const result = await Prisma.$queryRaw`
            UPDATE "UserUploadedFile" SET "note" = ${note}
            WHERE "uploadedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
        case 'userFreeUploadFile': {
          const result = await Prisma.$queryRaw`
            UPDATE "UserFreeUploadFile" SET "note" = ${note}
            WHERE "id" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
      }
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static shareFile = async (req: Request, res: Response) => {
    const { fileId, type } = req.params
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      fileId: z.string().uuid(),
      type: z.enum(fileType),
      userId: z.string().uuid(),
    })
    console.log(fileId, type, userId)
    try {
      schema.parse({ fileId, type, userId })
      switch (type) {
        case 'uploadedFile': {
          const result = await Prisma.$queryRaw`
            UPDATE "UserUploadedFile" SET "isShared" = true
            WHERE "uploadedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
        }
        case 'userFreeUploadFile': {
          const result = await Prisma.$queryRaw`
            UPDATE "UserFreeUploadFile" SET "isShared" = true
            WHERE "id" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
        }
        default: {
          res.status(400).json({ message: 'invalid type' })
        }
      }
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static unShareFile = async (req: Request, res: Response) => {
    const { fileId, type } = req.params
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      fileId: z.string().uuid(),
      type: z.enum(fileType),
      userId: z.string().uuid(),
    })
    try {
      schema.parse({ fileId, type, userId })
      switch (type) {
        case 'uploadedFile': {
          const result = await Prisma.$queryRaw`
            UPDATE "UserUploadedFile" SET "isShared" = false
            WHERE "uploadedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
        case 'userFreeUploadFile': {
          const result = await Prisma.$queryRaw`
            UPDATE "UserFreeUploadFile" SET "isShared" = false
            WHERE "id" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
        default: {
          res.status(400).json({ message: 'invalid type' })
        }
      }
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static deleteFile = async (req: Request, res: Response) => {
    const { fileId, type } = req.params
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      fileId: z.string().uuid(),
      type: z.enum(fileType),
      userId: z.string().uuid(),
    })
    try {
      schema.parse({ fileId, type, userId })
      switch (type) {
        case 'generatedFile': {
          const result = await Prisma.$queryRaw`
            DELETE FROM "UserGeneratedFile"
            WHERE "generatedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
        case 'uploadedFile': {
          const result = await Prisma.$queryRaw`
            DELETE FROM "UserUploadedFile"
            WHERE "uploadedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
        case 'userFreeUploadFile': {
          const result = await Prisma.$queryRaw`
            DELETE FROM "UserFreeUploadFile"
            WHERE "id" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          res.status(200).json({ message: 'success' })
          break
        }
      }
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static newUserFreeUploadFile = async (req: Request, res: Response) => {
    const { officialName, note, expirationDate, URI } = req.body
    const userId = req.headers['user-id'] as string

    console.log(officialName, note, expirationDate, URI, userId)
    const schema = z.object({
      officialName: z.string(),
      note: z.string(),
      userId: z.string().uuid(),
      URI: z.string(),
    })
    try {
      schema.parse({ officialName, note, userId, URI })

      const expired = expirationDate ? new Date(expirationDate) : null

      const result = await Prisma.$queryRaw`
        INSERT INTO "UserFreeUploadFile" ("id","userId", "uploadedDate", "expirationDate", "note", "URI",
        "isShared", "officialName","date")
        VALUES (gen_random_uuid(), ${userId}::uuid, now(), ${expired}, ${note}, ${URI}, false, ${officialName}, now())
        RETURNING "id"
     `
      res.status(200).json({ message: 'success', id: result[0].id })
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static getFreeUploadFile = async (req: Request, res: Response) => {
    const { fileId } = req.params
    const schema = z.object({
      fileId: z.string().uuid(),
    })
    try {
      schema.parse({ fileId })
      const result = await Prisma.$queryRaw`
        SELECT * FROM "UserFreeUploadFile"
        WHERE "id" = ${fileId}::uuid
     `
      res.status(200).json(result[0])
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static getSharedFile = async (req: Request, res: Response) => {
    console.log(req.params)
    const { fileId, type } = req.params
    const schema = z.object({
      fileId: z.string().uuid(),
      type: z.enum(fileType),
    })
    try {
      schema.parse({ fileId, type })
      switch (type) {
        case 'uploadedFile': {
          const result = await Prisma.$queryRaw`
            SELECT * FROM "UserUploadedFile"
            LEFT JOIN "UploadedFile" ON "UserUploadedFile"."uploadedFileId" = "UploadedFile"."id"
            WHERE "UserUploadedFile"."id" = ${fileId}::uuid
         `
          res.status(200).json(result[0])
          break
        }
        case 'userFreeUploadFile': {
          const result = await Prisma.$queryRaw`
            SELECT * FROM "UserFreeUploadFile"
            WHERE "id" = ${fileId}::uuid
         `
          res.status(200).json(result[0])
          break
        }
        default: {
          res.status(400).json({ message: 'invalid type' })
        }
      }
    } catch (err) {
      res.status(400).json(err)
    }
  }
}

export default File
