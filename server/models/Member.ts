import { Relationship } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'
import getRelationshipEnum from '@utils/getRelationshipEnum'
import Prisma from '@utils/prisma'

class Member {
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
      profileURI: z.string().url(),
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
}

export default Member
