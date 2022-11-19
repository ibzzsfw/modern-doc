import create from 'zustand'

type MyProfilePageStore = {
  isEdit: boolean
  setEdit: (value: boolean) => void
  subDistrict: []
  district: []
  province: []
  postalCode: []
  isModalOpen: boolean
  setModalOpen: () => void
  setModalClose: () => void
}

export const useMyProfileStore = create<MyProfilePageStore>((set) => ({
  isEdit: false,
  setEdit: (value) => set({ isEdit: value }),
  subDistrict: [],
  district: [],
  province: [],
  postalCode: [],
  isModalOpen: false,
  setModalOpen: () => set({ isModalOpen: true }),
  setModalClose: () => set({ isModalOpen: false }),
}))
