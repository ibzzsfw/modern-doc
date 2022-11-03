import create from 'zustand'

type LoginDataStore = {
  userId: string
  householdId: string
  title: string
  firstName: string
  lastName: string
  citizenId: string
  phoneNumber: string
  sex: 'ชาย' | 'หญิง' | ''
  token: string
  setLoginData: (value: any) => void
}

export const useLoginDataStore = create<LoginDataStore>((set) => ({
  userId: '',
  householdId: '',
  title: '',
  firstName: '',
  lastName: '',
  citizenId: '',
  phoneNumber: '',
  sex: '',
  token: '',
  setLoginData: (value) =>
    set({
      userId: value.userId,
      householdId: value.householdId,
      title: value.title,
      firstName: value.firstName,
      lastName: value.lastName,
      citizenId: value.citizenId,
      phoneNumber: value.phoneNumber,
      sex: value.sex,
      token: value.token,
    }),
}))
