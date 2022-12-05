import Field from '@models/Field'
import File from '@models/File'
import create from 'zustand'

interface FormPageStore {
  document: File | null
  field: Field[]
  setField: (field: Field[]) => void
  setDocument: (document: File | null) => void
}

export const useFormPageStore = create<FormPageStore>((set) => ({
  document: null,
  field: [],
  setField: (field) => set({ field }),
  setDocument: (document) => set({ document }),
}))
