import UserType from '../types/User';

class UserViewModel implements UserType {
  id
  houseId
  title
  firstName
  lastName
  citizenId
  phoneNumber
  sex
  relationship
  profileURI

  constructor(arg: UserType) {
    this.id = arg.id;
    this.houseId = arg.houseId;
    this.title = arg.title;
    this.firstName = arg.firstName;
    this.lastName = arg.lastName;
    this.citizenId = arg.citizenId;
    this.phoneNumber = arg.phoneNumber;
    this.sex = arg.sex;
    this.relationship = arg.relationship;
    this.profileURI = arg.profileURI;
  }
}

export default UserViewModel;