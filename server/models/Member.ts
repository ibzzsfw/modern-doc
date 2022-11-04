import { Request, Response } from 'express'
import { z } from 'zod'
import Prisma from '@utils/prisma'

class Member {
  static addMember = async (req: Request, res: Response) => {
    const schema = z.object({
      title: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      sex: z.enum(['ชาย', 'หญิง']),
      birthDate: z.string(),
      citizenId: z.string(),
      phoneNumber: z.string().length(10),
      password: z.string().min(6),
    })
  }
}

export default Member
