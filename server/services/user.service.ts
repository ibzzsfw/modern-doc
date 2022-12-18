import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import checkCitizenId from '@utils/checkCitizenId'
import getSexEnum from '@utils/getSexEnum'
import getSexText from '@utils/getSexText'
import Prisma from '@utils/prisma'
import async from 'async'

class UserService {
  private getFieldValue = (field: string, data: any): string => {
    switch (field) {
      case 'firstname_personal':
        return data.firstName
      case 'lastname_personal':
        return data.lastName
      case 'citizenId_personal':
        return data.citizenId
      case 'phonenumber_personal':
        return data.phoneNumber
      case 'title_personal':
        return data.title
      case 'sex_personal':
        return getSexText(data.sex)
      case 'birthdate_personal':
        return data.birthDate
    }
  }

  checkCitizenIdStatus = async (citizenId: string) => {

    const schema = z.string().regex(/^[0-9]{13}$/)
    try {
      schema.parse(citizenId)
      if (!checkCitizenId(citizenId)) {
        return {
          status: 400,
          json: { message: 'Citizen ID is not valid' },
        }
      }
      const user = await Prisma.user.findUnique({
        where: {
          citizenId,
        },
      })
      if (user) {
        return {
          status: 400,
          json: { message: 'Citizen ID already exists' },
        }
      }
      return {
        status: 200,
        json: { message: 'Citizen ID is available' },
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }

  checkPhoneStatus = async (phone: string) => {

    const schema = z.string().regex(/^[0-9]{10}$/)
    try {
      schema.parse(phone)
      const user = await Prisma.user.findUnique({
        where: {
          phoneNumber: phone,
        },
      })
      if (user) {
        return {
          status: 400,
          json: { message: 'Phone number already exists' },
        }
      }
      return {
        status: 200,
        json: { message: 'Phone number is available' },
      }
    } catch (err) {
      return {
        status: 500,
        json: { message: err },
      }
    }
  }


  addUser = async (body: any) => {

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
    try {
      schema.parse(body)
      body.sex = getSexEnum(body.sex)
      let hashedPassword = await bcrypt.hash(body.password, 10)
      let {
        title,
        firstName,
        lastName,
        sex,
        birthDate,
        citizenId,
        phoneNumber,
      } = body

      birthDate = new Date(birthDate)

      const createUser = await Prisma.user.create({
        data: {
          title,
          firstName,
          lastName,
          sex,
          birthDate,
          citizenId,
          phoneNumber,
          hashedPassword,
        },
      })
      let wantedField = [
        'sex_personal',
        'firstname_personal',
        'phonenumber_personal',
        'title_personal',
        'citizenId_personal',
        'birthdate_personal',
        'lastname_personal',
      ]

      const getFieldId = await Prisma.field.findMany({
        where: {
          name: {
            in: wantedField,
          },
        },
        select: {
          id: true,
          name: true,
        },
      })

      wantedField.map((field) => {
        getFieldId.map(async (item) => {
          if (field === item.name) {
            await Prisma.userField.create({
              data: {
                userId: createUser.id,
                fieldId: item.id,
                rawValue: this.getFieldValue(field, body),
              },
            })
          }
        })
      })

      return {
        status: 201,
        json: { message: 'success' },
      }
    } catch (err) {
      return {
        status: 400,
        json: { message: err },
      }
    }
  }

  checkPhonePassword = async (phoneNumber: any, password: any) => {

    const schema = z.object({
      phoneNumber: z.string().length(10),
      password: z.string().min(6),
    })

    try {
      schema.parse({ phoneNumber, password })
      const getUser = await Prisma.user.findUnique({
        where: {
          phoneNumber: phoneNumber,
        },
        select: {
          hashedPassword: true,
        },
      })
      if (!getUser) {
        return {
          status: 404,
          json: { message: 'ไม่พบข้อมูลผู้ใช้งาน' },
        }
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        getUser.hashedPassword
      )
      if (!isPasswordMatch) {
        return {
          status: 403,
          json: { message: 'รหัสผ่านไม่ถูกต้อง' },
        }
      }

      return {
        status: 200,
        json: getUser,
      }
    } catch (err) {
      return {
        status: 400,
        json: { message: err },
      }
    }
  }

  login = async (phoneNumber: string) => {

    const schema = z.string().length(10)

    try {
      schema.parse(phoneNumber)
      const getUser = await Prisma.user.findUnique({
        where: {
          phoneNumber: phoneNumber,
        },
        select: {
          id: true,
          householdId: true,
          title: true,
          firstName: true,
          lastName: true,
          sex: true,
          phoneNumber: true,
          email: true,
          citizenId: true,
          relationship: true,
          birthDate: true,
          profileURI: true,
        },
      })
      if (!getUser) {
        return {
          status: 404,
          json: { message: 'ไม่พบข้อมูลผู้ใช้งาน' },
        }
      }
      const token = jwt.sign({ id: getUser.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      })

      const getFamilyMember = await Prisma.user.findMany({
        where: {
          householdId: getUser.householdId,
          id: {
            not: getUser.id,
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

      const userData = {
        ...getUser,
        sex: getSexText(getUser.sex),
        token,
        familyMembers: getFamilyMember,
      }

      return {
        status: 200,
        json: userData,
      }
    } catch (err) {
      return {
        status: 400,
        json: { message: err },
      }
    }
  }

  getFolders = async (userId: string) => {

    const schema = z.string()

    try {
      schema.parse(userId)
      const folder = await Prisma.userFolder.findMany({
        where: {
          userId: userId,
        },
        select: {
          folder: true,
        },
      })

      let folderArr = await async.map(folder, (folder: any, callback: any) => {
        callback(null, folder.folder)
      })
      return {
        status: 200,
        json: folderArr,
      }
    } catch (err) {
      return {
        status: 400,
        json: { message: err },
      }
    }
  }

  getFiles = async (userId: string) => {

    const schema = z.string()

    try {
      schema.parse(userId)
      const generatedFile = await Prisma.userGeneratedFile.findMany({
        where: {
          userId: userId,
        },
        select: {
          generatedFile: true,
        },
      })
      const uploadedFile = await Prisma.userUploadedFile.findMany({
        where: {
          userId: userId,
        },
        select: {
          uploadedFile: true,
        },
      })
      const freeUploadFile = await Prisma.userFreeUploadFile.findMany({
        where: {
          userId: userId,
        },
      })

      let generatedFileArr = await async.map(
        generatedFile,
        (file: any, callback: any) => {
          callback(null, file.generatedFile)
        }
      )

      let uploadedFileArr = await async.map(
        uploadedFile,
        (file: any, callback: any) => {
          callback(null, file.uploadedFile)
        }
      )

      let freeUploadFileArr = await async.map(
        freeUploadFile,
        (file: any, callback: any) => {
          callback(null, file.freeUploadFile)
        }
      )

      const files = {
        generatedFile: generatedFileArr,
        uploadedFile: uploadedFileArr,
        freeUploadFile: freeUploadFileArr,
      }
      return {
        status: 200,
        json: files,
      }
    } catch (err) {
      return {
        status: 400,
        json: { message: err },
      }
    }
  }

  switchMember = async (userId: string) => {

    const schema = z.string().uuid()

    try {
      schema.parse(userId)
      const getUser = await Prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          householdId: true,
          title: true,
          firstName: true,
          lastName: true,
          sex: true,
          phoneNumber: true,
          email: true,
          citizenId: true,
          relationship: true,
          birthDate: true,
          profileURI: true,
        },
      })
      if (!getUser) {
        return {
          status: 404,
          json: { message: 'ไม่พบข้อมูลผู้ใช้งาน' },
        }
      }

      const getFamilyMember = await Prisma.user.findMany({
        where: {
          householdId: getUser.householdId,
          id: {
            not: getUser.id,
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

      const userData = {
        ...getUser,
        sex: getSexText(getUser.sex),
        familyMembers: getFamilyMember,
      }
      return {
        status: 200,
        json: userData,
      }
    } catch (err) {
      return {
        status: 400,
        json: { message: err },
      }
    }
  }

  editProfile = async (userId: string, body: any) => {
    let {
      title,
      firstName,
      lastName,
      sex,
      phoneNumber,
      birthDate,
      profileURI,
      password,
    } = body

    const schema = z.object({
      userId: z.string().uuid(),
      title: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      sex: z.any(),
      phoneNumber: z.string(),
      birthDate: z.string(),
      profileURI: z.string(),
      password: z.string(),
    })
    try {
      schema.parse({
        userId,
        title,
        firstName,
        lastName,
        sex,
        phoneNumber,
        birthDate,
        profileURI,
        password,
      })

      const getUser = await Prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          hashedPassword: true,
        },
      })

      if (!getUser) {
        return {
          status: 404,
          json: { message: 'ไม่พบข้อมูลผู้ใช้งาน' },
        }
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        getUser.hashedPassword
      )

      if (!isPasswordCorrect) {
        return {
          status: 400,
          json: { message: 'รหัสผ่านไม่ถูกต้อง' },
        }
      }

      const editProfile = await Prisma.$queryRaw`
      UPDATE "User" SET "title" = ${title}, "firstName" = ${firstName}, 
      "lastName" = ${lastName}, sex= ${getSexEnum(
        sex
      )}::"Sex", "phoneNumber" = ${phoneNumber},
      "profileURI" = ${profileURI}, 
      "birthDate" = ${new Date(
        birthDate
      )} WHERE "id" = ${userId}::uuid RETURNING *
      `

      return {
        status: 200,
        json: editProfile,
      }
    } catch (err) {
      return {
        status: 400,
        json: { message: err },
      }
    }
  }

  changePassword = async (userId: string, oldPassword: string, newPassword: string) => {

    const schema = z.object({
      userId: z.string().uuid(),
      oldPassword: z.string(),
      newPassword: z.string(),
    })

    try {
      schema.parse({
        userId,
        oldPassword,
        newPassword,
      })

      const getUser = await Prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          hashedPassword: true,
        },
      })

      if (!getUser) {
        return {
          status: 404,
          json: { message: 'ไม่พบข้อมูลผู้ใช้งาน' },
        }
      }

      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        getUser.hashedPassword
      )

      if (!isPasswordCorrect) {
        return {
          status: 400,
          json: { message: 'รหัสผ่านไม่ถูกต้อง' },
        }
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)

      const changePassword = await Prisma.$queryRaw`
      UPDATE "User" SET "hashedPassword" = ${hashedPassword} WHERE "id" = ${userId}::uuid RETURNING *
      `
      return {
        status: 200,
        json: changePassword,
      }
    } catch (err) {
      return {
        status: 400,
        json: { message: err },
      }
    }
  }
}

export default UserService
