import create from 'zustand'

/**
 * @interface IMyProfilePageModel
 * @description store for my profile page
 * @property {boolean} isEdit - is edit mode
 * @property {any} subDistrict - sub district data
 * @property {any} district - district data
 * @property {any} province - province data
 * @property {any} postalCode - postal code data
 */
interface IMyProfilePageModel {
  isEdit: boolean
  setEdit: (value: boolean) => void
}

export const MyProfilePageModel = create<IMyProfilePageModel>((set) => ({
  isEdit: false,
  setEdit: (value) => set({ isEdit: value }),
}))
