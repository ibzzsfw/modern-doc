import create from 'zustand'

/**
 * @interface IFamilyPageModel
 * @description store for family page 
 */
interface IFamilyPageModel {
  page: number
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
  hideChilden: boolean
  setPage: (value: number) => void
  setMode: (value: 'add' | 'edit') => void
  setHideChildren: (value: boolean) => void
}

export const FamilyPageModel = create<IFamilyPageModel>((set) => ({
  page: 1,
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
  hideChilden: false,
  setPage: (value) => set({ page: value }),
  setMode: (value) => set({ mode: value }),
  setHideChildren: (value) => set({ hideChilden: value }),
}))
