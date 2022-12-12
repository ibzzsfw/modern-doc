import create, { StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import UserType from '@view-models/UserType'

/**
 * @interface ILoginDataModel
 * @description ILoginDataModel interface for login data use in many pages
 * @property {UserType} user - User data
 * @property {UserType[]} familyMembers - Family members data
 * @property {function} setUserData - Set user data
 * @property {function} setFamilyMembers - Set family members data
 */
interface ILoginDataModel {
  user: UserType | null
  familyMembers: UserType[]
  setUserData: (value: any) => void
  setFamilyMembers: (value: any) => void
}

type MyPersist = (
  config: StateCreator<ILoginDataModel>,
  options: PersistOptions<ILoginDataModel>
) => StateCreator<ILoginDataModel>

export const LoginDataModel = create<ILoginDataModel>(
  (persist as unknown as MyPersist)(
    (set) => ({
      user: null,
      familyMembers: [],
      setUserData: (user) => {
        set({
          user: user,
        })
      },
      setFamilyMembers: (familyMembers) => {
        set({
          familyMembers: familyMembers,
        })
      },
    }),
    {
      name: 'login-data-store',
      getStorage: () => sessionStorage,
    }
  )
)
