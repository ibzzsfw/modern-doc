import Relationship from '@models/Relationship'
import getRelationshipText from '@utils/getRelationshipText'
import UserType from '@models/UserType'
class User implements UserType {
  id
  householdId
  title
  firstName
  lastName
  citizenId
  phoneNumber
  sex
  token
  relationship
  profileURI

  constructor(arg: UserType) {
    this.id = arg.id
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

  public getFullName(): string {
    return `${this.title}${this.firstName} ${this.lastName}`
  }

  public getRelationshipText(): string {
    return getRelationshipText(this.relationship)
  }
}

export default User
