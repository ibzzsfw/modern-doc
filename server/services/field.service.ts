import IFieldService from '@contracts/services/field.service'
import BaseService from '.'

class FieldService extends BaseService implements IFieldService {

  constructor() {
    super()
  }
  testConsoleLog(): void {
    console.log("Log from Service impl")
  }

  async createField(name: string, officialName: string, description: string, type: any) {

    const schema = this._z.object({
      name: this._z.string(),
      officialName: this._z.string(),
      description: this._z.string(),
      type: this._z.enum([
        'text',
        'number',
        'date',
        'singleSelect',
        'multipleSelect',
      ]),
    })

    try {
      schema.parse({ name, officialName, description, type })
      const field = await this._prisma.field.create({
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
      const fields = await this._prisma.field.findMany()
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
    const schema = this._z.array(
      this._z.object({
        name: this._z.string(),
        officialName: this._z.string(),
        description: this._z.string(),
        type: this._z.enum([
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
      const field = await this._prisma.field.createMany({
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
    const schema = this._z.object({
      id: this._z.string().uuid(),
      officialName: this._z.string(),
    })
    try {
      schema.parse({ id, officialName })
      const editField = await this._prisma.field.update({
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

    const schema = this._z.object({
      fieldId: this._z.string().uuid(),
      name: this._z.string(),
      officialName: this._z.string(),
    })
    try {
      schema.parse({
        fieldId,
        name,
        officialName,
      })
      const checkType = await this._prisma.field.findUnique({
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
      const addChoice = await this._prisma.fieldChoice.create({
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

    const schema = this._z.string().uuid()
    try {
      schema.parse(choiceId)
      const deleteChoice = await this._prisma.fieldChoice.delete({
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
