import { z } from 'zod'
import Prisma from '@utils/prisma'

class NoteService {
  addFreeNote = async (heading: string, content: string, userId: string) => {
    const schema = z.object({
      heading: z.string(),
      content: z.string().optional(),
    })
    try {
      schema.parse({ heading, content })
      const addNote = await Prisma.$queryRaw`
        INSERT INTO "Note" ("id","userId","createdDate","modifiedDate","heading","content")
        VALUES (gen_random_uuid(),${userId}::uuid,NOW(),NOW(),${heading},${content})
      `
      return {
        status: 200,
        json: addNote,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  editNote = async (noteId: string, heading: string, content: string, userId: string) => {

    const schema = z.object({
      noteId: z.string().uuid(),
      heading: z.string(),
      content: z.string().optional(),
    })
    try {
      schema.parse({ noteId, heading, content })
      const editNote = await Prisma.$queryRaw`
        UPDATE "Note"
        SET "modifiedDate" = NOW(), "heading" = ${heading}, "content" = ${content}
        WHERE "id" = ${noteId}::uuid AND "userId" = ${userId}::uuid
        RETURNING *
      `
      return {
        status: 200,
        json: editNote,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  deleteNote = async (noteId: string, userId: string) => {

    const schema = z.object({
      noteId: z.string().uuid(),
    })
    try {
      schema.parse({ noteId })
      const deleteNote = await Prisma.$queryRaw`
        DELETE FROM "Note"
        WHERE id = ${noteId}::uuid AND "userId" = ${userId}::uuid
        RETURNING *
      `
      return {
        status: 200,
        json: deleteNote,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  getAllNote = async (userId: string) => {

    try {
      const getAllNote = await Prisma.$queryRaw`
        SELECT *
        FROM "Note"
        WHERE "userId" = ${userId}::uuid
        ORDER BY "modifiedDate" DESC
      `
      return {
        status: 200,
        json: getAllNote,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }
}

export default NoteService
