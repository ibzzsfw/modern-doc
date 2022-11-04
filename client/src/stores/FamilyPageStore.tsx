import { values } from 'pdf-lib'
import create from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

type FamilyPageStore = {
  page: number
  setPage: (value: number) => void
  prefix : ['นาย' | 'นาง' | 'นางสาว' | 'เด็กชาย' | 'เด็กหญิง']
    setPrefix: (value: 'นาย' | 'นาง' | 'นางสาว' | 'เด็กชาย' | 'เด็กหญิง') => void
 relationship : ['บิดา' | 'มารดา' | 'พี่' | 'น้อง' | 'อื่นๆ' | 'เจ้าของบ้าน' | 'ผู้อาศัย']
 setRealtionship: (value: 'บิดา' | 'มารดา' | 'พี่' | 'น้อง' | 'อื่นๆ' | 'เจ้าของบ้าน' | 'ผู้อาศัย') => void
  callback : () => void
  mode : 'add' | 'edit'
  setMode: (value: 'add' | 'edit') => void
  hideChilden : boolean
  setHideChildren: (value: boolean) => void
}

export const useFamilyPageStore = create<FamilyPageStore>((set) => ({
  page: 1,
  setPage: (value) => set({ page: value }),
    prefix: ['นาย' , 'นาง' , 'นางสาว' , 'เด็กชาย' , 'เด็กหญิง'],
    setPrefix: (value) => set({ prefix: value }),
    relationship:  ['บิดา' , 'มารดา' , 'พี่' , 'น้อง' , 'อื่นๆ' , 'เจ้าของบ้าน' , 'ผู้อาศัย'],
    setRealtionship: (value) => set({ relationship: value }),
  callback: () => {},
  mode: 'edit',
  setMode: (value) => set({ mode: value }),
  hideChilden: false,
  setHideChildren: (value) => set({ hideChilden: value }),
}))
