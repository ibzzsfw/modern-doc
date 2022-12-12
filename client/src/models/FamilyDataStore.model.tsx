import create from 'zustand'

/**
 * @interface IFamilyDataModel
 * @description Family data interface
 * @property {User} user - User data
 * @property {Function} setUser - Set user data
 */
interface IFamilyDataModel {
  user: any
  setUser: (value: any) => void
}

export const FamilyDataModel = create<IFamilyDataModel>((set) => ({
  user: {
    userId: '',
    householdId: '',
    title: '',
    firstName: '',
    lastName: '',
    citizenId: '',
    phoneNumber: '',
    sex: '',
    token: '',
    relationship: '',
    profileURI: '',
  },
  setUser: (user) => {
    set({
      user: user,
    })
  },
}))
