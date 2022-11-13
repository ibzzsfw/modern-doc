import create from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

type FamilyPageStore = {
  page: number
  setPage: (value: number) => void
  title: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง']
  relationship: [
    'บิดา',
    'มารดา',
    'พี่',
    'น้อง',
    'อื่นๆ',
    'เจ้าของบ้าน',
    'ผู้อาศัย'
  ]
  mode: 'add' | 'edit'
  setMode: (value: 'add' | 'edit') => void
  hideChilden: boolean
  setHideChildren: (value: boolean) => void
}

export const useFamilyPageStore = create<FamilyPageStore>((set) => ({
  page: 1,
  setPage: (value) => set({ page: value }),
  title: ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'],
  relationship: [
    'บิดา',
    'มารดา',
    'พี่',
    'น้อง',
    'อื่นๆ',
    'เจ้าของบ้าน',
    'ผู้อาศัย',
  ],
  mode: 'edit',
  setMode: (value) => set({ mode: value }),
  hideChilden: false,
  setHideChildren: (value) => set({ hideChilden: value }),
}))
