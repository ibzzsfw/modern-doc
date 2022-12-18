import create from 'zustand'

/**
 * @interface IRegisterModel
 * @description RegisterModel interface for register page
 * @property {number} page - current page tab
 */
interface IRegisterModel {
  page: number
  title: string[]
  sex: string[]
  setPage: (value: number) => void
  setTitle: (value: string[]) => void
}

export const RegisterModel = create<IRegisterModel>((set) => ({
  page: 1,
  title: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'],
  sex: ['ชาย', 'หญิง'],
  setTitle: (value) => set({ title: value }),
  setPage: (value) => set({ page: value }),
}))
