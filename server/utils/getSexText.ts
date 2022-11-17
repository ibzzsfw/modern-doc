import { Sex } from '@prisma/client'

const getSexText = (sex: Sex): 'ชาย' | 'หญิง' => {
  switch (sex) {
    case 'm':
      return 'ชาย'
    case 'f':
      return 'หญิง'
  }
}

export default getSexText
