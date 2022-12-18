import Field from '@view-models/Field'
import File from '@view-models/File'
import create from 'zustand'

/**
 * @interface IFormPageModel
 * @description FormPageModel is a zustand store that holds the state of the form page
 * @property {File | null} document - the document that is being edited
 * @property {Field[]} field - the fields of the document
 * @property {File[]} selectedDocument - the selected document
 * @property {File[]} generatedFiles - the generated files
 * @property {'folder' | 'file'} documentType - the type of document
 * @property {'newFile' | 'editFile'} type - the type of the form
 * @property {(documentType: 'folder' | 'file') => void} setDocumentType - set the document type
 * @property {(generatedFiles: File[]) => void} setGeneratedFiles - set the generated files
 * @property {(selectedDocument: File[]) => void} setSelectedDocument - set the selected document
 * @property {(type: 'newFile' | 'editFile') => void} setType - set the type of the form
 * @property {(field: Field[]) => void} setField - set the fields of the document
 * @property {(document: File | null) => void} setDocument - set the document that is being edited
 * @example
 */
interface IFormPageModel {
  document: File | null
  field: Field[]
  selectedDocument: File[]
  generatedFiles: File[]
  documentType: 'folder' | 'file'
  type: 'newFile' | 'editFile'
  setDocumentType: (documentType: 'folder' | 'file') => void
  setGeneratedFiles: (generatedFiles: File[]) => void
  setSelectedDocument: (selectedDocument: File[]) => void
  setType: (type: 'newFile' | 'editFile') => void
  setField: (field: Field[]) => void
  setDocument: (document: File | null) => void
}

export const FormPageModel = create<IFormPageModel>((set) => ({
  document: null,
  field: [],
  type: 'newFile',
  documentType: 'file',
  selectedDocument: [],
  generatedFiles: [],
  setSelectedDocument: (selectedDocument) => set({ selectedDocument }),
  setDocumentType: (documentType) => set({ documentType }),
  setGeneratedFiles: (generatedFiles) => set({ generatedFiles }),
  setType: (type) => set({ type }),
  setField: (field) => set({ field }),
  setDocument: (document) => set({ document }),
}))
