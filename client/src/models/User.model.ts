import create, { StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import UserViewModel from '@view-models/User.viewmodel'
import FolderViewModel from '@view-models/Folder.viewmodel'
import NoteViewModel from '@view-models/Note.viewmodel'

interface IUserModel {
  user: UserViewModel | null,
  family: UserViewModel[],
  address: {
    subDistrict: []
    district: []
    province: []
    postalCode: []
  },
  latestFolder: FolderViewModel[],
  folder: FolderViewModel[],
  file: any[],
  note: NoteViewModel[],
  setUser: (user: UserViewModel) => void,
  setFamily: (family: UserViewModel[]) => void,
  setAddress: (address: {
    subDistrict: []
    district: []
    province: []
    postalCode: []
  }) => void,
  setLatestFolder: (latestFolder: FolderViewModel[]) => void,
  setFolder: (folder: FolderViewModel[]) => void,
  setFile: (file: any[]) => void,
  setNote: (note: NoteViewModel[]) => void,
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
      address: {
        subDistrict: [],
        district: [],
        province: [],
        postalCode: [],
      },
      latestFolder: [],
      folder: [],
      file: [],
      note: [],
      setUser: (user: UserViewModel) => set({ user }),
      setFamily: (family: UserViewModel[]) => set({ family }),
      setAddress: (address: {
        subDistrict: []
        district: []
        province: []
        postalCode: []
      }) => set({ address }),
      setLatestFolder: (latestFolder: FolderViewModel[]) =>
        set({ latestFolder }),
      setFolder: (folder: FolderViewModel[]) => set({ folder }),
      setFile: (file: any[]) => set({ file }),
      setNote: (note: NoteViewModel[]) => set({ note }),
    }),
    {
      name: 'user',
      getStorage: () => sessionStorage,
    }
  )
)

export default UserModel;