interface UserType {
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
}
export default UserType