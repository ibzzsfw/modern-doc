interface UserType {
  id?: string;
  householdId?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  citizenId?: string;
  phoneNumber?: string;
  sex?: 'ชาย' | 'หญิง' | 'ไม่ระบุ';
  relationship?: string;
  profileURI?: string;
  password?: string;
  token?: string;
  email?: string;
  birthDate?: string;
}

export default UserType;