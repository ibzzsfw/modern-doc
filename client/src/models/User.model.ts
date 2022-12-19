import UserViewModel from '@view-models/User.viewmodel'
import create, { StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

interface IUserModel {
  user: UserViewModel | null,
  family: UserViewModel[],
  setUser: (user: UserViewModel) => void,
  setFamily: (family: UserViewModel[]) => void,
}

type MyPersist = (
  config: StateCreator<IUserModel>,
  options: PersistOptions<IUserModel>
) => StateCreator<IUserModel>

const UserModel = create<IUserModel>(
  (persist as unknown as MyPersist)(
    (set) => ({
      user: null,
      family: [],
      setUser: (user: UserViewModel) => set({ user }),
      setFamily: (family: UserViewModel[]) => set({ family }),
    }),
    {
      name: 'user',
      getStorage: () => sessionStorage,
    }
  )
)

export default UserModel;