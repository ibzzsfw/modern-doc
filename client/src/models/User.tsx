import Relationship from '@models/Relationship'
import getRelationshipText from '@utils/getRelationshipText'
import UserType from '@models/UserType'
class User {
  userId: string
  householdId: string
  title: string
  firstName: string
  lastName: string
  citizenId: string
  phoneNumber: string
  sex: 'ชาย' | 'หญิง' | ''
  token: string
  relationship: Relationship
  profileURI: string

  constructor(arg: UserType) {
    this.userId = arg.userId
    this.householdId = arg.householdId
    this.title = arg.title
    this.firstName = arg.firstName
    this.lastName = arg.lastName
    this.citizenId = arg.citizenId
    this.phoneNumber = arg.phoneNumber
    this.sex = arg.sex
    this.token = arg.token
    this.relationship = arg.relationship
    this.profileURI = arg.profileURI
  }

  getFullName(): string {
    return `${this.title}${this.firstName} ${this.lastName}`
  }

  getRelationshipText(): string {
    return getRelationshipText(this.relationship)
  }
}

export default User
