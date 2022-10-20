import create from 'zustand'

type RegisterStore = {
  page: number
  setPage: (value: number) => void
  prefix: string[]
  setPrefix: (value: string[]) => void
  sex: string[]
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  page: 1,
  setPage: (value) => set({ page: value }),
  prefix: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'],
  setPrefix: (value) => set({ prefix: value }),
  sex: ['ชาย', 'หญิง'],
}))
