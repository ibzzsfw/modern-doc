import { Request, Response } from 'express'
import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import checkCitizenId from '../utils/checkCitizenId'

class Test {
  static test = async (req: Request, res: Response) => {
    res.json({ message: 'test' })
  }
}

export default Test
