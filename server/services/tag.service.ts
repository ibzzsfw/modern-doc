import Prisma from '@utils/prisma'
import { z } from 'zod'

class TagService {
  addTag = async (name: string) => {

    const schema = z.string()
    try {
      schema.parse(name)
      const tag = await Prisma.tag.create({
        data: {
          name,
        },
      })
      return {
        status: 200,
        json: tag,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  addTagMany = async (tags: any) => {

    const schema = z.array(z.string())
    try {
      schema.parse(tags)
      const tag = await Prisma.tag.createMany({
        data: tags.map((tag) => {
          return {
            name: tag,
          }
        }),
      })
      return {
        status: 200,
        json: tag,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  getAllTag = async () => {
    try {
      const tags = await Prisma.tag.findMany()
      return {
        status: 200,
        json: tags,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  getTagByName = async (name: any) => {

    const schema = z.string()
    try {
      schema.parse(name)
      const tag = await Prisma.tag.findFirst({
        where: {
          name: {
            contains: name,
          },
        },
      })
      return {
        status: 200,
        json: tag,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  getTagById = async (id: string) => {
    const schema = z.string().uuid()
    try {
      schema.parse(id)
      const tag = await Prisma.tag.findFirst({
        where: {
          id: id,
        },
      })
      return {
        status: 200,
        json: tag,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  editTagName = async (id: string, name: string) => {

    const schema = z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
    try {
      schema.parse({ id, name })
      const editTag = await Prisma.tag.update({
        where: {
          id,
        },
        data: {
          name,
        },
      })
      return {
        status: 200,
        json: editTag,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }
}

export default TagService
