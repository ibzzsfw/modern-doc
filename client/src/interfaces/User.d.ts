interface IUser {
  private id?: string;
  private householdId?: string;
  private title?: string;
  private firstName?: string;
  private lastName?: string;
  private citizenId?: string;
  private phoneNumber?: string;
  private sex?: 'ชาย' | 'หญิง' | 'ไม่ระบุ';
  private relationship?: string;
  private profileURI?: string;
  private password?: string;
  private token?: string;
  private email?: string;
  private birthDate?: string;
}

export default IUser;