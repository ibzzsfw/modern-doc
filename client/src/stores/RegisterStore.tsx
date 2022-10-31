import create from 'zustand'

type RegisterStore = {
  page: number
  setPage: (value: number) => void
  title: string[]
  setTitle: (value: string[]) => void
  sex: string[]
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  page: 1,
  setPage: (value) => set({ page: value }),
  title: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'],
  setTitle: (value) => set({ title: value }),
  sex: ['ชาย', 'หญิง'],
}))
