import { Relationship } from '@prisma/client'

const RelationshipText = (relationship: Relationship): string => {
  switch (relationship) {
    case 'householder':
      return 'เจ้าของแอคเคาท์'
    case 'father':
      return 'บิดา'
    case 'mother':
      return 'มารดา'
    case 'children':
      return 'บุตร'
    case 'cousin':
      return 'พี่น้อง'
    case 'spouse':
      return 'คู่สมรส'
    case 'other':
      return 'อื่นๆ'
  }
}

export default RelationshipText
