import { Request, Response } from 'express'
import { z } from 'zod'
import Prisma from '@utils/prisma'

class Note {
  static addFreeNote = async (req: Request, res: Response) => {
    const { heading, content } = req.body
    const userId = req.headers['user-id'] as string
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
      res.json(addNote)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static editNote = async (req: Request, res: Response) => {
    const { noteId } = req.params
    const { heading, content } = req.body
    const userId = req.headers['user-id'] as string
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
      res.json(editNote)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static deleteNote = async (req: Request, res: Response) => {
    const { noteId } = req.params
    const userId = req.headers['user-id'] as string
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
      res.json(deleteNote)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static getAllNote = async (req: Request, res: Response) => {
    const userId = req.headers['user-id'] as string
    try {
      const getAllNote = await Prisma.$queryRaw`
        SELECT *
        FROM "Note"
        WHERE "userId" = ${userId}::uuid
      `
      res.json(getAllNote)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }
}

export default Note
