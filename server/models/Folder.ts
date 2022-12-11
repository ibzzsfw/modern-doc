import Prisma from '@utils/prisma'
import async from 'async'
import { Request, Response } from 'express'
import { z } from 'zod'

class Folder {
  static async getFolderById(req: Request, res: Response) {
    const { id } = req.params
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      id: z.string().uuid(),
      userId: z.string().uuid(),
    })

    try {
      schema.parse({ id, userId })
      const folder = await Prisma.$queryRaw`
        SELECT "Folder".*
        FROM "Folder" 
        WHERE "Folder"."id" = ${id}::uuid
      `

      let userFolder = await Prisma.$queryRaw`
        SELECT "UserFolder"."note","UserFolder"."date"
        FROM "UserFolder"
        WHERE "UserFolder"."folderId" = ${id}::uuid AND "UserFolder"."userId" = ${userId}::uuid
      `

      if ((userFolder = []))
        userFolder[0] = {
          note: null,
          date: null,
        }

      const file = await Prisma.$queryRaw`
        SELECT "GeneratedFile"."id","GeneratedFile"."officialName"
        ,"FolderGeneratedFile"."amount","FolderGeneratedFile"."remark",
        "UserGeneratedFile"."note","UserGeneratedFile"."date",'generatedFile' AS "type",
        '' AS "URI", NULL AS "expirationDate"
        -- ,array(SELECT json_agg("Field".*) FROM "GeneratedFileField" 
        -- LEFT JOIN "GeneratedFile" ON "GeneratedFileField"."generatedFileId" = "GeneratedFile"."id"
        -- LEFT JOIN "Field" ON "Field"."id" = "GeneratedFileField"."fieldId") AS "fields"
        FROM "FolderGeneratedFile"
        LEFT JOIN "GeneratedFile" ON "FolderGeneratedFile"."generatedFileId" = "GeneratedFile"."id"
        LEFT JOIN "UserGeneratedFile" ON ("GeneratedFile"."id" = "UserGeneratedFile"."generatedFileId"
          AND "UserGeneratedFile"."userId" = ${userId}::uuid
        )
        WHERE "FolderGeneratedFile"."folderId" = ${id}::uuid 
        UNION
        SELECT "UploadedFile"."id","UploadedFile"."officialName",
        "FolderUploadedFile"."amount","FolderUploadedFile"."remark",
        "UserUploadedFile"."note","UserUploadedFile"."date"
        ,'uploadedFile' AS "type",
        "UserUploadedFile"."URI","UserUploadedFile"."expirationDate"
        FROM "FolderUploadedFile"
        LEFT JOIN "UploadedFile" ON "FolderUploadedFile"."uploadedFileId" = "UploadedFile"."id"
        LEFT JOIN "UserUploadedFile" ON ("UploadedFile"."id" = "UserUploadedFile"."uploadedFileId"
          AND "UserUploadedFile"."userId" = ${userId}::uuid
        )
        WHERE "FolderUploadedFile"."folderId" = ${id}::uuid 
      `

      res.json({
        ...folder[0],
        ...userFolder[0],
        file,
      })
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static async getLatestFolder(req: Request, res: Response) {
    const userId = req.headers['user-id'] as string
    const schema = z.string().uuid()

    try {
      schema.parse(userId)
      const folder = await Prisma.$queryRaw`
        SELECT "Folder".*,"UserFolder"."note","UserFolder"."date" 
        FROM "UserFolder"
        LEFT JOIN "Folder" ON "UserFolder"."folderId" = "Folder"."id"
        WHERE "UserFolder"."userId" = ${userId}::uuid
        ORDER BY "UserFolder"."date" DESC
        LIMIT 3
      `
      res.json(folder)
    } catch (err) {
      res.status(400).json(err)
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
      const folder = await Prisma.$queryRaw`
        SELECT DISTINCT "Folder".*,'generatedFolder' AS "type" FROM "Folder"
        LEFT JOIN "FolderTag" ON "Folder"."id" = "FolderTag"."folderId"
        LEFT JOIN "Tag" ON "FolderTag"."tagId" = "Tag"."id"
        WHERE ("Folder"."officialName" ILIKE ${`%${name}%`} OR "Folder"."description" ILIKE ${`%${name}%`}
        OR "Tag"."name" ILIKE ${`%${name}%`})
        LIMIT 9
      `
      res.json(folder)
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static addNote = async (req: Request, res: Response) => {
    const { userFolderId } = req.params
    const { note } = req.body
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      userFolderId: z.string().uuid(),
      note: z.string(),
      userId: z.string().uuid(),
    })

    try {
      schema.parse({ userFolderId, note, userId })
      const folder = await Prisma.$queryRaw`
        UPDATE "UserFolder" SET "note" = ${note} 
        WHERE "id" = ${userFolderId}::uuid 
        AND "userId" = ${userId}::uuid
      `
      res.json(folder)
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static getField = async (req: Request, res: Response) => {
    const generatedFileIds = JSON.parse(
      req.headers['generated-file-ids'] as string
    )
    const userId = req.headers['user-id'] as string
    const schema = z.object({
      generatedFileIds: z.array(z.string().uuid()),
      userId: z.string().uuid(),
    })
    try {
      schema.parse({ generatedFileIds, userId })
      let arr = []
      let promise = generatedFileIds.map(async (generatedFileId, index) => {
        const field = await Prisma.$queryRaw`
          SELECT  array(
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
          WHERE "GeneratedFileField"."generatedFileId" = ${generatedFileId}::uuid
          AND ("UserField"."userId" = ${userId}::uuid OR "UserField"."userId" IS NULL)
        ) AS "fields" FROM "GeneratedFileField" WHERE id = ${generatedFileId}::uuid
        `
        console.log(field)
        arr.push(field[0])
      })
      await Promise.all(promise)
      res.json(arr)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}

export default Folder
