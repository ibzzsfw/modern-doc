import Prisma from '@utils/prisma'
import async from 'async'
import { Request, Response } from 'express'
import { z } from 'zod'

class GeneratedFileService {

  async getAll(req: Request, res: Response) {
    try {
      const files = await Prisma.userGeneratedFile.findMany()
      return res.status(200).json(files)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

}

export default GeneratedFileService