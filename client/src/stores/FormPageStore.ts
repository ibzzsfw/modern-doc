import Field from '@models/Field'
import File from '@models/File'
import create from 'zustand'

interface FormPageStore {
  document: File | null
  field: Field[]
  selectedDocument: File[]
  setSelectedDocument: (selectedDocument: File[]) => void
  selectedDocumentField: Field[][]
  setSelectedDocumentField: (selectedDocumentField: Field[][]) => void
  documentType: 'folder' | 'file'
  setDocumentType: (documentType: 'folder' | 'file') => void
  type: 'newFile' | 'editFile'
  setType: (type: 'newFile' | 'editFile') => void
  setField: (field: Field[]) => void
  setDocument: (document: File | null) => void
}

export const useFormPageStore = create<FormPageStore>((set) => ({
  document: null,
  field: [],
  type: 'newFile',
  documentType: 'file',
  setDocumentType: (documentType) => set({ documentType }),
  selectedDocument: [],
  setSelectedDocument: (selectedDocument) => set({ selectedDocument }),
  selectedDocumentField: [],
  setSelectedDocumentField: (selectedDocumentField) =>
    set({ selectedDocumentField }),
  setType: (type) => set({ type }),
  setField: (field) => set({ field }),
  setDocument: (document) => set({ document }),
}))
