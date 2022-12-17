import create from 'zustand'

/**
 * @interface IMyProfilePageModel
 * @description store for my profile page
 * @property {boolean} isEdit - is edit mode
 * @property {any} subDistrict - sub district data
 * @property {any} district - district data
 * @property {any} province - province data
 * @property {any} postalCode - postal code data
 * @property {boolean} isModalOpen - is modal open
 * @property {function} setEdit - set edit mode
 * @property {function} setModalOpen - set modal open
 * @property {function} setModalClose - set modal close
 */
interface IMyProfilePageModel {
  isEdit: boolean
  subDistrict: []
  district: []
  province: []
  postalCode: []
  // isModalOpen: boolean
  setEdit: (value: boolean) => void
  // setModalOpen: () => void
  // setModalClose: () => void
}

export const MyProfilePageModel = create<IMyProfilePageModel>((set) => ({
  isEdit: false,
  subDistrict: [],
  district: [],
  province: [],
  postalCode: [],
  isModalOpen: false,
  setEdit: (value) => set({ isEdit: value }),
  // setModalOpen: () => set({ isModalOpen: true }),
  // setModalClose: () => set({ isModalOpen: false }),
}))
