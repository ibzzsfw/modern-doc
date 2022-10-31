import { Request, Response } from 'express'
import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import checkCitizenId from '../utils/checkCitizenId'

class User {
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
    let schema = Yup.object().shape({
      title: Yup.string(),
      firstName: Yup.string().required('จำเป็นต้องกรอก'),
      lastName: Yup.string().required('จำเป็นต้องกรอก'),
      sex: Yup.mixed().oneOf(['m', 'f']).required('จำเป็นต้องกรอก'),
      birthDate: Yup.date().required('จำเป็นต้องกรอก'),
      citizenId: Yup.string()
        .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
        .length(13, 'รหัสบัตรประชาชนต้องมี 13 หลัก')
        .required('จำเป็นต้องกรอก'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
        .length(10, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก')
        .required('จำเป็นต้องกรอก'),
      password: Yup.string()
        .min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
        .required('จำเป็นต้องกรอก'),
    })
    try {
      const prisma = new PrismaClient()
      await schema.validate(req.body, { abortEarly: false })
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

      const user = await prisma.user.create({
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
      res.status(201).json({ message: 'success' })
    } catch (err) {
      res.status(400).json({ message: err })
    }
  }
}

export default User
