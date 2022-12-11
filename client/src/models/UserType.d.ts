interface UserType {
  id: string
  householdId: string
  title: string
  firstName: string
  lastName: string
  citizenId: string
  email: string
  phoneNumber: string
  birthDate: string
  sex: 'ชาย' | 'หญิง' | ''
  token: string
  relationship: Relationship
  profileURI: string
}
export default UserType
