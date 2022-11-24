import create from 'zustand'
import UserViewModel from '../viewmodels/User.viewmodel'

interface IUserModel {
  user: UserViewModel | null,
  family: UserViewModel[],
  setUser: (user: UserViewModel) => void,
  setFamily: (family: UserViewModel[]) => void,
}

const UserModel = create<IUserModel>((set) => ({
  user: null,
  family: [],
  setUser: (user: UserViewModel) => set({ user }),
  setFamily: (family: UserViewModel[]) => set({ family }),
}))

export default UserModel;