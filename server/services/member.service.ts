import IMemberService from '@services/interfaces/member.service'
import getRelationshipEnum from '@utils/getRelationshipEnum'
import BaseService from '.'
class MemberService extends BaseService implements IMemberService {
  static getUserHouseholdId(userId: string) {
    throw new Error('Method not implemented.')
  }
  getUserHouseholdId = async (userId: string) => {
    const user = await this._prisma.user.findUnique({
      where: { id: userId },
      select: { householdId: true },
    })
    return user.householdId
  }

  getAllMembers = async (householdId: string, userId: string) => {

    const schema = this._z.string().uuid()
    try {
      schema.parse(householdId)
      const members = await this._prisma.user.findMany({
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
      return {
        status: 200,
        json: members,
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  addMember = async (householdId: any, title: any, firstName: any, lastName: any, citizenId: any, relationship: any) => {

    const schema = this._z.object({
      householdId: this._z.string().uuid(),
      title: this._z.string(),
      firstName: this._z.string(),
      lastName: this._z.string(),
      citizenId: this._z.string(),
      relationship: this._z.string(),
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
      const addMember = await this._prisma.user.create({
        data: {
          householdId,
          title,
          firstName,
          lastName,
          citizenId,
          relationship: getRelationshipEnum(relationship),
        },
      })
      return {
        status: 200,
        json: addMember,
      }
    } catch (err) {
      return {
        status: 400,
        json: err,
      }
    }
  }

  editMember = async (id: string, body: any) => {

    const schema = this._z.object({
      title: this._z.string(),
      firstName: this._z.string(),
      lastName: this._z.string(),
      relationship: this._z.string(),
      profileURI: this._z.string(),
    })

    try {
      const data = schema.parse(body)
      const editMember = await this._prisma.user.update({
        where: { id: id },
        data: {
          title: data.title,
          firstName: data.firstName,
          lastName: data.lastName,
          relationship: getRelationshipEnum(data.relationship),
          profileURI: data.profileURI,
        },
      })
      return {
        status: 200,
        json: { editMember },
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  deleteMember = async (id: string) => {

    const schema = this._z.object({
      id: this._z.string().uuid(),
    })
    try {
      schema.parse({ id })
      const deleteMember = await this._prisma.user.delete({
        where: { id: id },
      })
      return {
        status: 200,
        json: { deleteMember },
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  getMemberAvailableUploadedFile = async (
    fileId: string,
    userId: string
  ) => {

    const schema = this._z.object({
      fileId: this._z.string().uuid(),
      userId: this._z.string().uuid(),
    })
    try {
      schema.parse({ fileId, userId: userId })
      const familyId = await this.getUserHouseholdId(userId)
      const fileAvailableMember = await this._prisma.$queryRaw`
        SELECT "User"."id","User"."profileURI","User"."firstName",
        "User"."lastName","User"."relationship",
        "UserUploadedFile"."URI"
         FROM "User" 
        LEFT JOIN "UserUploadedFile" ON ("UserUploadedFile"."userId" = "User"."id"
        AND "UserUploadedFile"."uploadedFileId" = ${fileId}::uuid
        )
        WHERE "User"."householdId" = ${familyId}::uuid
        AND "User"."id" != ${userId}::uuid
      `
      return {
        status: 200,
        json: fileAvailableMember,
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }
}

export default MemberService
