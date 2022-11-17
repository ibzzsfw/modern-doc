import { Relationship } from '@prisma/client'

const getRelationshipEnum = (
  relationship:
    | string
    | 'เจ้าของแอคเคาท์'
    | 'บิดา'
    | 'มารดา'
    | 'บุตร'
    | 'พี่น้อง'
    | 'คู่สมรส'
    | 'อื่นๆ'
): Relationship => {
  switch (relationship) {
    case 'เจ้าของแอคเคาท์':
      return 'householder'
    case 'บิดา':
      return 'father'
    case 'มารดา':
      return 'mother'
    case 'บุตร':
      return 'children'
    case 'พี่น้อง':
      return 'cousin'
    case 'คู่สมรส':
      return 'spouse'
    default:
      return 'other'
  }
}

export default getRelationshipEnum
