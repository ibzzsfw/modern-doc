type Sex = 'ชาย' | 'หญิง' | 'ไม่ระบุ';

interface UserType {
  id: string;
  houseId?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  citizenId?: string;
  phoneNumber?: string;
  sex?: Sex;
  relationship?: string;
  profileURI?: string;
}

export default UserType;