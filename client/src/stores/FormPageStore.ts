import Field from '@models/Field'
import File from '@models/File'
import create from 'zustand'

interface FormPageStore {
  document: File | null
  field: Field[]
  selectedDocument: File[]
  setSelectedDocument: (selectedDocument: File[]) => void
  generatedFiles: File[]
  setGeneratedFiles: (generatedFiles: File[]) => void
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
  generatedFiles: [],
  setGeneratedFiles: (generatedFiles) => set({ generatedFiles }),
  setType: (type) => set({ type }),
  setField: (field) => set({ field }),
  setDocument: (document) => set({ document }),
}))
