import create, { StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

type LoginDataStore = {
  user: any
  setLoginData: (value: any) => void
}

type MyPersist = (
  config: StateCreator<LoginDataStore>,
  options: PersistOptions<LoginDataStore>
) => StateCreator<LoginDataStore>

export const useLoginDataStore = create<LoginDataStore>(
  (persist as unknown as MyPersist)(
    (set) => ({
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
        profileURI:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
      },
      setLoginData: (user) => {
        set({
          user: user,
        })
      },
    }),
    {
      name: 'login-data-store',
      getStorage: () => sessionStorage,
    }
  )
)
