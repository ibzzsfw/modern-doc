import IFileService from '@contracts/services/file.service'
import async from 'async'
import BaseService from '.'

const fileType = [
  'generatedFile',
  'uploadedFile',
  'userFreeUploadFile',
  'sharedFile',
] as const

class FileService extends BaseService implements IFileService {

  constructor() {
    super()
  }

  private async getFile(id: string, type: string, userId: string) {
    switch (type) {
      case 'generatedFile': {
        return await this._prisma.$queryRaw`
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
        return await this._prisma.$queryRaw`
          SELECT "UploadedFile".*, "UserUploadedFile"."URI",
          "UploadedFile"."URI" AS "previewURI",
          "UserUploadedFile"."date",
          "UserUploadedFile"."expirationDate"
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
        return await this._prisma.$queryRaw`
            SELECT * FROM "UserFreeUploadFile"
            WHERE "id" = ${id}::uuid
          `
      }
      default:
        return null
    }
  }


  private async getLatestFile(type: string, userId: string) {
    switch (type) {
      case 'generatedFile':
        return await this._prisma.userGeneratedFile.findMany({
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
        return await this._prisma.userUploadedFile.findMany({
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
        const user = await this._prisma.user.findUnique({
          where: { id: userId },
          select: { householdId: true },
        })
        const householdId = user.householdId

        return await this._prisma.$queryRaw`
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
        return await this._prisma.userFreeUploadFile.findMany({
          where: {
            userId,
          },
          orderBy: {
            date: 'desc',
          },
        })
    }
  }

  async getFileById(id: string, type: string, userId: string) {
    const schema = this._z.object({
      id: this._z.string().uuid(),
      type: this._z.enum(fileType),
      userId: this._z.string().uuid(),
    })
    try {
      schema.parse({ id, type, userId })
      let result = await this.getFile(id, type, userId)
      if (type === 'generatedFile') {
        result[0].fields.sort((a: any, b: any) => a.order - b.order)
      }
      return {
        status: 200,
        json: { ...result[0], type: type },
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  async getLatestFiles(type: string, userId: string) {
    const schema = this._z.object({
      type: this._z.enum(fileType),
      userId: this._z.string().uuid(),
    })
    try {
      schema.parse({ type, userId })
      let result = await this.getLatestFile(type, userId)
      let formattedResult = await async.map(result, (file, callback) => {
        callback(null, {
          ...file,
          ...file[type],
          [type]: undefined,
          type: type === 'sharedFile' ? 'uploadedFile' : type,
        })
      })
      return {
        status: 200,
        json: formattedResult,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  async searchByName(name: string, userId: string) {
    const schema = this._z.object({
      name: this._z.string(),
      userId: this._z.string().uuid(),
    })

    try {
      schema.parse({ name, userId })
      const file = await this._prisma.$queryRaw`
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
      return {
        status: 200,
        json: file,
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  async getAll(userId: string) {
    const schema = this._z.object({
      userId: this._z.string().uuid(),
    })

    try {
      schema.parse({ userId })
      const file = await this._prisma.$queryRaw`
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
      return {
        status: 200,
        json: file,
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  async newGeneratedFile(fileId: string, fields: any[], userId: string) {
    const schema = this._z.object({
      fields: this._z.array(
        this._z.object({
          id: this._z.string().uuid(),
          name: this._z.string(),
          userValue: this._z.string(),
        })
      ),
      fileId: this._z.string().uuid(),
      userId: this._z.string().uuid(),
    })

    try {
      schema.parse({ fields, fileId, userId })
      const updateUserGeneratedFile = await this._prisma.$queryRaw`
        INSERT INTO "UserGeneratedFile" ( "id","userId", "generatedFileId", "date")
        VALUES ((SELECT gen_random_uuid()),${userId}::uuid, ${fileId}::uuid, ${new Date()})
        ON CONFLICT ("userId", "generatedFileId") DO UPDATE SET "date" = ${new Date()}
        `
      const promise = await async.map(fields, async (field) => {
        const { name, userValue } = field
        const updateField = await this._prisma.$queryRaw`
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
      return {
        status: 200,
        json: { message: 'success' },
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  async newUploadedFile(fileId: string, URI: string, note: string, expired: Date | null, userId: string,) {
    const schema = this._z.object({
      fileId: this._z.string().uuid(),
      URI: this._z.string().url(),
      userId: this._z.string().uuid(),
      note: this._z.string().optional(),
    })
    try {
      schema.parse({ fileId, URI, userId })
      const result = await this._prisma.$queryRaw`
        INSERT INTO "UserUploadedFile" ("id","userId","uploadedFileId","URI","isShared"
        ,"note","expirationDate","date")
        VALUES ((SELECT gen_random_uuid()),${userId}::uuid, ${fileId}::uuid, ${URI}, false, ${note}, ${expired}, ${new Date()})
        ON CONFLICT ("userId", "uploadedFileId") DO UPDATE SET "URI" = ${URI}, "date" = ${new Date()}, "note" = ${note}, "expirationDate" = ${expired}
      `
      return {
        status: 200,
        json: { message: 'success' },
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  addNote = async (fileId: string, type: string, note: string, userId: string) => {
    const schema = this._z.object({
      fileId: this._z.string().uuid(),
      type: this._z.enum(fileType),
      userId: this._z.string().uuid(),
      note: this._z.string(),
    })
    try {
      schema.parse({ fileId, type, userId, note })
      switch (type) {
        case 'generatedFile': {
          const result = await this._prisma.$queryRaw`
            UPDATE "UserGeneratedFile" SET "note" = ${note} 
            WHERE "generatedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          break
        }
        case 'uploadedFile': {
          const result = await this._prisma.$queryRaw`
            UPDATE "UserUploadedFile" SET "note" = ${note}
            WHERE "uploadedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          break
        }
        case 'userFreeUploadFile': {
          const result = await this._prisma.$queryRaw`
            UPDATE "UserFreeUploadFile" SET "note" = ${note}
            WHERE "id" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          break
        }
      }
      return {
        status: 200,
        json: { message: 'success' },
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  shareFile = async (fileId: string, type: string, userId: string) => {

    const schema = this._z.object({
      fileId: this._z.string().uuid(),
      type: this._z.enum(fileType),
      userId: this._z.string().uuid(),
    })
    try {
      schema.parse({ fileId, type, userId })
      switch (type) {
        case 'uploadedFile': {
          const result = await this._prisma.$queryRaw`
            UPDATE "UserUploadedFile" SET "isShared" = true
            WHERE "uploadedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          return {
            status: 200,
            json: { message: 'success' },
          }
        }
        case 'userFreeUploadFile': {
          const result = await this._prisma.$queryRaw`
          UPDATE "UserFreeUploadFile" SET "isShared" = true
          WHERE "id" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          return {
            status: 200,
            json: { message: 'success' },
          }
        }
        default: {
          return {
            status: 400,
            json: { message: 'invalid type' },
          }
        }
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  unShareFile = async (fileId: string, type: string, userId: string) => {

    const schema = this._z.object({
      fileId: this._z.string().uuid(),
      type: this._z.enum(fileType),
      userId: this._z.string().uuid(),
    })
    try {
      schema.parse({ fileId, type, userId })
      switch (type) {
        case 'uploadedFile': {
          const result = await this._prisma.$queryRaw`
            UPDATE "UserUploadedFile" SET "isShared" = false
            WHERE "uploadedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          return {
            status: 200,
            json: { message: 'success' },
          }
          break
        }
        case 'userFreeUploadFile': {
          const result = await this._prisma.$queryRaw`
            UPDATE "UserFreeUploadFile" SET "isShared" = false
            WHERE "id" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          return {
            status: 200,
            json: { message: 'success' },
          }
          break
        }
        default: {
          return {
            status: 400,
            json: { message: 'invalid type' },
          }
        }
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  deleteFile = async (fileId: string, type: string, userId: string) => {

    const schema = this._z.object({
      fileId: this._z.string().uuid(),
      type: this._z.enum(fileType),
      userId: this._z.string().uuid(),
    })
    try {
      schema.parse({ fileId, type, userId })
      switch (type) {
        case 'generatedFile': {
          const result = await this._prisma.$queryRaw`
            DELETE FROM "UserGeneratedFile"
            WHERE "generatedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          break
        }
        case 'uploadedFile': {
          const result = await this._prisma.$queryRaw`
            DELETE FROM "UserUploadedFile"
            WHERE "uploadedFileId" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          break
        }
        case 'userFreeUploadFile': {
          const result = await this._prisma.$queryRaw`
            DELETE FROM "UserFreeUploadFile"
            WHERE "id" = ${fileId}::uuid AND "userId" = ${userId}::uuid`
          break
        }
      }
      return {
        status: 200,
        json: { message: 'success' },
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  newUserFreeUploadFile = async (officialName: string, note: string, expirationDate: any, URI: string, userId: string) => {

    const schema = this._z.object({
      officialName: this._z.string(),
      note: this._z.string(),
      userId: this._z.string().uuid(),
      URI: this._z.string(),
    })
    try {
      schema.parse({ officialName, note, userId, URI })

      const expired = expirationDate ? new Date(expirationDate) : null

      const result = await this._prisma.$queryRaw`
        INSERT INTO "UserFreeUploadFile" ("id","userId", "uploadedDate", "expirationDate", "note", "URI",
        "isShared", "officialName","date")
        VALUES (gen_random_uuid(), ${userId}::uuid, now(), ${expired}, ${note}, ${URI}, false, ${officialName}, now())
        RETURNING "id"
     `
      return {
        status: 200,
        json: { message: 'success', id: result[0].id },
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  getFreeUploadFile = async (fileId: string) => {

    const schema = this._z.object({
      fileId: this._z.string().uuid(),
    })
    try {
      schema.parse({ fileId })
      const result = await this._prisma.$queryRaw`
      SELECT * FROM "UserFreeUploadFile"
      WHERE "id" = ${fileId}::uuid
   `
      return {
        status: 200,
        json: result[0],
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  getSharedFile = async (fileId: string, type: string) => {

    const schema = this._z.object({
      fileId: this._z.string().uuid(),
      type: this._z.enum(fileType),
    })
    try {
      schema.parse({ fileId, type })
      switch (type) {
        case 'uploadedFile': {
          const result = await this._prisma.$queryRaw`
            SELECT * FROM "UserUploadedFile"
            LEFT JOIN "UploadedFile" ON "UserUploadedFile"."uploadedFileId" = "UploadedFile"."id"
            WHERE "UserUploadedFile"."id" = ${fileId}::uuid
         `
          return {
            status: 200,
            json: result[0],
          }
        }
        case 'userFreeUploadFile': {
          const result = await this._prisma.$queryRaw`
            SELECT * FROM "UserFreeUploadFile"
            WHERE "id" = ${fileId}::uuid
         `
          return {
            status: 200,
            json: result[0],
          }
        }
        default: {
          return {
            status: 400,
            json: { message: 'invalid type' },
          }
        }
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

}

export default FileService
