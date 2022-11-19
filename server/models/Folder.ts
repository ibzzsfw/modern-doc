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
        SELECT "Folder".*,"UserFolder"."note","UserFolder"."date" 
        FROM "Folder" 
        LEFT JOIN "UserFolder" ON "Folder"."id" = "UserFolder"."folderId"
        WHERE "Folder"."id" = ${id}::uuid AND "UserFolder"."userId" = ${userId}::uuid
      `

      const generateFile = await Prisma.$queryRaw`
        SELECT "GeneratedFile".*,"FolderGeneratedFile"."amount","FolderGeneratedFile"."remark",
        "UserGeneratedFile"."note","UserGeneratedFile"."date",
        array(SELECT json_agg("Field".*) FROM "GeneratedFileField" 
        LEFT JOIN "GeneratedFile" ON "GeneratedFileField"."generatedFileId" = "GeneratedFile"."id"
        LEFT JOIN "Field" ON "Field"."id" = "GeneratedFileField"."fieldId") AS "fields"
        FROM "FolderGeneratedFile"
        LEFT JOIN "GeneratedFile" ON "FolderGeneratedFile"."generatedFileId" = "GeneratedFile"."id"
        LEFT JOIN "UserGeneratedFile" ON "GeneratedFile"."id" = "UserGeneratedFile"."generatedFileId"
        WHERE "FolderGeneratedFile"."folderId" = ${id}::uuid 
      `

      const uploadFile = await Prisma.$queryRaw`
        SELECT "UploadedFile".*,"UserUploadedFile"."note","UserUploadedFile"."date"
        FROM "FolderUploadedFile"
        LEFT JOIN "UploadedFile" ON "FolderUploadedFile"."uploadedFileId" = "UploadedFile"."id"
        LEFT JOIN "UserUploadedFile" ON "UploadedFile"."id" = "UserUploadedFile"."uploadedFileId"
        WHERE "FolderUploadedFile"."folderId" = ${id}::uuid AND "UserUploadedFile"."userId" = ${userId}::uuid
      `

      res.json({ ...folder[0], generateFile, uploadFile })
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
}

export default Folder
