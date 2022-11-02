class User {

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: Date;
  relation: string;

  constructor(id: string, firstName: string, lastName: string, email: string, joinDate: Date, relation: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.joinDate = joinDate;
    this.relation = relation;
  }

}

export default User