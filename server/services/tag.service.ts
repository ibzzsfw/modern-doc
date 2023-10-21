import BaseService from "."
import ITagService from "@services/interfaces/tag.service"

class TagService extends BaseService implements ITagService {

  constructor() {
    super()
  }

  addTag = async (name: string) => {

    const schema = this._z.string()
    try {
      schema.parse(name)
      const tag = await this._prisma.tag.create({
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

    const schema = this._z.array(this._z.string())
    try {
      schema.parse(tags)
      const tag = await this._prisma.tag.createMany({
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
      const tags = await this._prisma.tag.findMany()
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

    const schema = this._z.string()
    try {
      schema.parse(name)
      const tag = await this._prisma.tag.findFirst({
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
    const schema = this._z.string().uuid()
    try {
      schema.parse(id)
      const tag = await this._prisma.tag.findFirst({
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

    const schema = this._z.object({
      id: this._z.string().uuid(),
      name: this._z.string(),
    })
    try {
      schema.parse({ id, name })
      const editTag = await this._prisma.tag.update({
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
