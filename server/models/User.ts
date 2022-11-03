import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import checkCitizenId from '../utils/checkCitizenId'
import getSexMF from '../utils/getSexMF'
import getSexText from '../utils/getSexText'
class User {
  static getFieldValue = (field: string, data: any): string => {
    switch (field) {
      case 'personal_firstname':
        return data.firstName
      case 'personal_lastname':
        return data.lastName
      case 'personal_citizenId':
        return data.citizenId
      case 'personal_phonenumber':
        return data.phoneNumber
      case 'personal_title':
        return data.title
      case 'personal_sex':
        return getSexText(data.sex)
      case 'personal_birthdate':
        return data.birthDate
    }
  }

  static checkCitizenIdStatus = async (req: Request, res: Response) => {
    const citizenId = req.params.citizenId.toString()
    console.log(citizenId)
    const prisma = new PrismaClient()
    if (!checkCitizenId(citizenId)) {
      return res.status(400).json({ message: 'Citizen ID is not valid' })
    }
    try {
      const user = await prisma.user.findUnique({
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

  static addUser = async (req: Request, res: Response) => {
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
      req.body.sex = getSexMF(req.body.sex)
      const prisma = new PrismaClient()
      let hashedPassword = await bcrypt.hash(req.body.password, 10)
      const {
        title,
        firstName,
        lastName,
        sex,
        birthDate,
        citizenId,
        phoneNumber,
      } = req.body

      const createUser = await prisma.user.create({
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
        'personal_sex',
        'personal_firstname',
        'personal_phonenumber',
        'personal_title',
        'personal_citizenId',
        'personal_birthdate',
        'personal_lastname',
      ]
      const getFieldId = await prisma.field.findMany({
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
            await prisma.userField.create({
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
      res.status(400).json({ message: err })
    }
  }

  static login = async (req: Request, res: Response) => {
    let prisma = new PrismaClient()
    const getUser = await prisma.user.findUnique({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    })
    if (!getUser) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' })
    }

    console.log(getUser.hashedPassword, req.body.password)

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      getUser.hashedPassword
    )
    if (!isPasswordMatch) {
      return res.status(403).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
    }
    const token = jwt.sign({ id: getUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.status(200).json({ ...getUser, token })
  }
}

export default User
