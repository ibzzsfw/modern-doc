import create from 'zustand'
import UserViewModel from '../viewmodels/User.viewmodel'

interface UserModel {
  user: UserViewModel | null,
  family: UserViewModel[],
  setUser: (user: UserViewModel) => void,
  setFamily: (family: UserViewModel[]) => void,
}

const useUserModel = create<UserModel>((set) => ({
  user: null,
  family: [],
  setUser: (user: UserViewModel) => set({ user }),
  setFamily: (family: UserViewModel[]) => set({ family }),
}))

export default useUserModel;