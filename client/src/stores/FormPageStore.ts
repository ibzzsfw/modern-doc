import Field from '@models/Field'
import File from '@models/File'
import create from 'zustand'

interface FormPageStore {
  document: File | null
  field: Field[]
  type: 'newFile' | 'editFile'
  setType: (type: 'newFile' | 'editFile') => void
  setField: (field: Field[]) => void
  setDocument: (document: File | null) => void
}

export const useFormPageStore = create<FormPageStore>((set) => ({
  document: null,
  field: [],
  type: 'newFile',
  setType: (type) => set({ type }),
  setField: (field) => set({ field }),
  setDocument: (document) => set({ document }),
}))
