import User from "@models/User";

class Householder extends User {

  relation: string = "householder";

  constructor(id: string, firstName: string, lastName: string, email: string, joinDate: Date) {
    super(id, firstName, lastName, email, joinDate, "householder");
  }

  addFamilyMember = (familyMember: User) => {
    // TODO: add family member to database
  }

  removeFamilyMember = (familyMember: User) => {
    // TODO: remove family member from database
  }

}

export default Householder