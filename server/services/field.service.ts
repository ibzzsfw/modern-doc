import { z } from 'zod'
import Prisma from '@utils/prisma'

class FieldService {

  async createField(name: string, officialName: string, description: string, type: any) {

    const schema = z.object({
      name: z.string(),
      officialName: z.string(),
      description: z.string(),
      type: z.enum([
        'text',
        'number',
        'date',
        'singleSelect',
        'multipleSelect',
      ]),
    })

    try {
      schema.parse({ name, officialName, description, type })
      const field = await Prisma.field.create({
        data: {
          name,
          officialName,
          description,
          type,
        },
      })
      return {
        status: 200,
        json: field
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err }
      }
    }
  }

  async getAllField() {
    try {
      const fields = await Prisma.field.findMany()
      return {
        status: 200,
        json: fields
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err }
      }
    }
  }

  async createFieldMany(fields: any) {
    const schema = z.array(
      z.object({
        name: z.string(),
        officialName: z.string(),
        description: z.string(),
        type: z.enum([
          'text',
          'number',
          'date',
          'singleSelect',
          'multipleSelect',
        ]),
      })
    )
    try {
      schema.parse(fields)
      const field = await Prisma.field.createMany({
        data: fields.map((field) => {
          return {
            name: field.name,
            officialName: field.officialName,
            description: field.description,
            type: field.type,
          }
        }),
      })
      return {
        status: 200,
        json: field
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err }
      }
    }
  }

  async editFieldOfficialName(id: string, officialName: string) {
    const schema = z.object({
      id: z.string().uuid(),
      officialName: z.string(),
    })
    try {
      schema.parse({ id, officialName })
      const editField = await Prisma.field.update({
        where: {
          id,
        },
        data: {
          officialName,
        },
      })
      return {
        status: 200,
        json: editField
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err }
      }
    }
  }

  async addChoice(fieldId: string, name: string, officialName: string) {

    const schema = z.object({
      fieldId: z.string().uuid(),
      name: z.string(),
      officialName: z.string(),
    })
    try {
      schema.parse({
        fieldId,
        name,
        officialName,
      })
      const checkType = await Prisma.field.findUnique({
        where: {
          id: fieldId,
        },
      })
      if (
        checkType.type !== 'singleSelect' &&
        checkType.type !== 'multipleSelect'
      ) {
        return {
          status: 500,
          json: { message: 'This field is not a select field' }
        }
      }
      const addChoice = await Prisma.fieldChoice.create({
        data: {
          fieldId: fieldId,
          name: name,
          officialName: officialName,
        },
      })
      return {
        status: 200,
        json: addChoice
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err }
      }
    }
  }

  async deleteChoice(choiceId: string) {

    const schema = z.string().uuid()
    try {
      schema.parse(choiceId)
      const deleteChoice = await Prisma.fieldChoice.delete({
        where: {
          id: choiceId,
        },
      })
      return {
        status: 200,
        json: deleteChoice
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err }
      }
    }
  }
}

export default FieldService
