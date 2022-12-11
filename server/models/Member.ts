import { Relationship } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'
import getRelationshipEnum from '@utils/getRelationshipEnum'
import Prisma from '@utils/prisma'

class Member {
  public static getUserHouseholdId = async (userId: string) => {
    const user = await Prisma.user.findUnique({
      where: { id: userId },
      select: { householdId: true },
    })
    return user.householdId
  }

  static getAllMembers = async (req: Request, res: Response) => {
    const householdId = req.headers['household-id'] as string
    const userId = req.headers['user-id'] as string
    const schema = z.string().uuid()
    try {
      schema.parse(householdId)
      const members = await Prisma.user.findMany({
        where: {
          householdId: householdId,
          id: {
            not: userId,
          },
        },
        select: {
          id: true,
          title: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          citizenId: true,
          relationship: true,
          profileURI: true,
        },
      })
      res.status(200).json(members)
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static addMember = async (req: Request, res: Response) => {
    const { householdId, title, firstName, lastName, citizenId, relationship } =
      req.body
    const schema = z.object({
      householdId: z.string().uuid(),
      title: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      citizenId: z.string(),
      relationship: z.string(),
    })
    try {
      schema.parse({
        householdId,
        title,
        firstName,
        lastName,
        citizenId,
        relationship,
      })
      const addMember = await Prisma.user.create({
        data: {
          householdId,
          title,
          firstName,
          lastName,
          citizenId,
          relationship: getRelationshipEnum(relationship),
        },
      })
      res.json(addMember)
    } catch (err) {
      res.status(400).json(err)
    }
  }

  static editMember = async (req: Request, res: Response) => {
    const { id } = req.params
    const schema = z.object({
      title: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      relationship: z.string(),
      profileURI: z.string(),
    })

    try {
      const data = schema.parse(req.body)
      const editMember = await Prisma.user.update({
        where: { id: id },
        data: {
          title: data.title,
          firstName: data.firstName,
          lastName: data.lastName,
          relationship: getRelationshipEnum(data.relationship),
          profileURI: data.profileURI,
        },
      })
      res.status(200).json({ editMember })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  static deleteMember = async (req: Request, res: Response) => {
    const { id } = req.params
    const schema = z.object({
      id: z.string().uuid(),
    })
    try {
      schema.parse({ id })
      const deleteMember = await Prisma.user.delete({
        where: { id: id },
      })
      res.status(200).json({ deleteMember })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  static getMemberAvailableUploadedFile = async (
    req: Request,
    res: Response
  ) => {
    const { fileId } = req.params
    const { userId } = req.headers
    const schema = z.object({
      fileId: z.string().uuid(),
      userId: z.string().uuid(),
    })
    try {
      schema.parse({ fileId, userId: userId })
      const familyId = await Member.getUserHouseholdId(userId)
      const fileAvailableMember = await Prisma.$queryRaw`
        SELECT "User"."id","User"."profileURI","User".firstName,
        "User".lastName","User"."relationship" FROM "UserUploadedFile" 
        LEFT JOIN "User" ON "UserUploadedFile"."userId" = "User"."id"
        WHERE "UserUploadedFile"."fileId" = ${fileId} 
        AND "User"."householdId" = ${familyId}
        AND "User"."id" != ${userId}
      `

      res.status(200).json(fileAvailableMember)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }
}

export default Member
