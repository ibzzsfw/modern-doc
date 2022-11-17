import { Sex } from '@prisma/client'

const getSexMF = (sex: 'ชาย' | 'หญิง'): Sex => {
  switch (sex) {
    case 'ชาย':
      return 'm'
    case 'หญิง':
      return 'f'
  }
}

export default getSexMF
