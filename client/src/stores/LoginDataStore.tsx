import create, { StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import UserType from '@models/UserType'

type LoginDataStore = {
  user: UserType | null
  familyMembers: UserType[]
  setUserData: (value: any) => void
  setFamilyMembers: (value: any) => void
}

type MyPersist = (
  config: StateCreator<LoginDataStore>,
  options: PersistOptions<LoginDataStore>
) => StateCreator<LoginDataStore>

export const useLoginDataStore = create<LoginDataStore>(
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
