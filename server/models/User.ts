import getRelationshipText from '@utils/getRelationshipText'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import checkCitizenId from '@utils/checkCitizenId'
import getSexEnum from '@utils/getSexEnum'
import getSexText from '@utils/getSexText'
import Prisma from '@utils/prisma'
import async from 'async'
class User {
  static getFieldValue = (field: string, data: any): string => {
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

  static checkCitizenIdStatus = async (req: Request, res: Response) => {
    const citizenId = req.params.citizenId
    const schema = z.string().regex(/^[0-9]{13}$/)
    try {
      schema.parse(citizenId)
      if (!checkCitizenId(citizenId)) {
        return res.status(400).json({ message: 'Citizen ID is not valid' })
      }
      const user = await Prisma.user.findUnique({
        where: {
          citizenId,
        },
      })
      if (user) {
        return res.status(400).json({ message: 'Citizen ID already exists' })
      }
      return res.status(200).json({ message: 'Citizen ID is available' })
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static checkPhoneStatus = async (req: Request, res: Response) => {
    const phone = req.params.phone
    const schema = z.string().regex(/^[0-9]{10}$/)
    try {
      schema.parse(phone)
      const user = await Prisma.user.findUnique({
        where: {
          phoneNumber: phone,
        },
      })
      if (user) {
        return res.status(400).json({ message: 'Phone number already exists' })
      }
      return res.status(200).json({ message: 'Phone number is available' })
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static addUser = async (req: Request, res: Response) => {
    console.log(req.body)
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
      schema.parse(req.body)
      req.body.sex = getSexEnum(req.body.sex)
      let hashedPassword = await bcrypt.hash(req.body.password, 10)
      let {
        title,
        firstName,
        lastName,
        sex,
        birthDate,
        citizenId,
        phoneNumber,
      } = req.body

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
      console.log(createUser)
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
                rawValue: this.getFieldValue(field, req.body),
              },
            })
          }
        })
      })

      res.status(201).json({ message: 'success' })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err })
    }
  }

  static checkPhonePassword = async (req: Request, res: Response) => {
    let { phoneNumber, password } = req.body

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
        return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' })
      }

      console.log(getUser.hashedPassword, password)

      const isPasswordMatch = await bcrypt.compare(
        password,
        getUser.hashedPassword
      )
      if (!isPasswordMatch) {
        return res.status(403).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
      }

      res.status(200).json(getUser)
    } catch (err) {
      res.status(400).json({ message: err })
    }
  }

  static login = async (req: Request, res: Response) => {
    let { phoneNumber } = req.body

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
        return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' })
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

      res.status(200).json(userData)
    } catch (err) {
      res.status(400).json({ message: err })
    }
  }

  static getFolders = async (req: Request, res: Response) => {
    let { userId } = req.params

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

      res.status(200).json(folderArr)
    } catch (err) {
      res.status(400).json({ message: err })
    }
  }

  static getFiles = async (req: Request, res: Response) => {
    let { userId } = req.params

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
      return res.json(files)
    } catch (err) {
      res.status(400).json({ message: err })
    }
  }

  static switchMember = async (req: Request, res: Response) => {
    let { userId } = req.body

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
        return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' })
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

      res.status(200).json(userData)
    } catch (err) {
      res.status(400).json({ message: err })
    }
  }

  static editProfile = async (req: Request, res: Response) => {
    let {
      title,
      firstName,
      lastName,
      sex,
      phoneNumber,
      birthDate,
      profileURI,
      password,
    } = req.body

    const userId = req.headers['user-id'] as string
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
        return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' })
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        getUser.hashedPassword
      )

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
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

      console.log(editProfile)

      console.log((editProfile as any).sex)

      res.status(200).json({
        ...editProfile[0],
        sex: getSexText(editProfile[0].sex),
      })
    } catch (err) {
      res.status(400).json({ message: err })
    }
  }

  static changePassword = async (req: Request, res: Response) => {
    let { oldPassword, newPassword } = req.body

    const userId = req.headers['user-id'] as string

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
        return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' })
      }

      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        getUser.hashedPassword
      )

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)

      const changePassword = await Prisma.$queryRaw`
      UPDATE "User" SET "hashedPassword" = ${hashedPassword} WHERE "id" = ${userId}::uuid RETURNING *
      `
      res.status(200).json(changePassword)
    } catch (err) {
      res.status(400).json({ message: err })
    }
  }
}

export default User
