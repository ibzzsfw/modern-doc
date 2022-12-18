import UserType from '@interfaces/User';

class UserViewModel implements UserType {
  id
  householdId
  title
  firstName
  lastName
  citizenId
  phoneNumber
  sex
  relationship
  profileURI
  password
  token
  email
  birthDate

  constructor(arg: UserType) {
    this.id = arg.id;
    this.householdId = arg.householdId;
    this.title = arg.title;
    this.firstName = arg.firstName;
    this.lastName = arg.lastName;
    this.citizenId = arg.citizenId;
    this.phoneNumber = arg.phoneNumber;
    this.sex = arg.sex;
    this.relationship = arg.relationship;
    this.profileURI = arg.profileURI;
    this.password = arg.password;
    this.token = arg.token;
    this.email = arg.email;
    this.birthDate = arg.birthDate;
  }

  getFullName = () => `${this.firstName} ${this.lastName}`

  getRelationshipText = (): string => {
    switch (this.relationship) {
      case 'householder':
        return 'เจ้าของบัญชี'
      case 'father':
        return 'บิดา'
      case 'mother':
        return 'มารดา'
      case 'children':
        return 'ลูก'
      case 'cousin':
        return 'พี่น้อง'
      case 'spouse':
        return 'คู่สมรส'
      default:
        return 'อื่นๆ'
    }
  }
}

export default UserViewModel;