import create from 'zustand'

/**
 * @interface IMyProfiledataModel
 * @description MyProfiledataModel interface for user profile
 * @property {User} user - User data
 * @property {string} profileUrl - Profile image url
 * @property {function} setUser - Set user data
 * @property {function} setUrl - Set profile image url
 */
interface IMyProfiledataModel {
  user: any
  profileUrl: string
  setUser(user: any): void
  setUrl(url: string): void
}


export const MyProfiledataModel = create<IMyProfiledataModel>((set) => ({
  user: {
    id: '',
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
    password: '',
  },
  profileUrl: '',
  setUser: (value: any) => set({ user: value }),
  setUrl: (value: string) => set({ profileUrl: value })
}))


