import Prisma from '@utils/prisma'
import async from 'async'
import { Request, Response } from 'express'
import { z } from 'zod'
import formatGeneratedFile from '@utils/formatGeneratedFile'
import formatUploadedFile from '@utils/formatUploadedFile'

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
      const folder = await Prisma.folder.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          officialName: true,
          description: true,
          dayLifeSpan: true,
          folderGeneratedFile: {
            select: {
              generatedFile: {
                select: {
                  id: true,
                  name: true,
                  officialName: true,
                  description: true,
                  dayLifeSpan: true,
                  URI: true,
                  generatedFileTag: {
                    select: {
                      tag: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                  generatedFileField: {
                    select: {
                      isRequired: true,
                      field: {
                        select: {
                          name: true,
                          officialName: true,
                          description: true,
                          type: true,
                          userField: {
                            where: {
                              userId: userId,
                            },
                            select: {
                              id: true,
                              rawValue: true,
                            },
                          },
                          fieldChoice: {
                            select: {
                              name: true,
                              officialName: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          folderUploadedFile: {
            select: {
              uploadedFile: {
                select: {
                  id: true,
                  name: true,
                  officialName: true,
                  description: true,
                  dayLifeSpan: true,
                  URI: true,
                  userUploadedFile: {
                    where: {
                      userId: userId,
                    },
                  },
                  uploadedFileTag: {
                    select: {
                      tag: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
      res.json(folder)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}

export default Folder
