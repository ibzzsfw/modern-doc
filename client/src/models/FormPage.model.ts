import create from "zustand";
import GenerateFileViewModel from "@view-models/GenerateFiles.viewmodel";
import FieldViewModel from '@view-models/Field.viewmodel'

interface IFormPageModel {
  documentType: 'file' | 'folder' | '';
  document: any;
  field: FieldViewModel[];
  selectedFile: any[];
  generatedFile: GenerateFileViewModel[];
  setDocumentType: (documentType: 'file' | 'folder' | '') => void;
  setDocument: (document: any) => void;
  setField: (field: FieldViewModel[]) => void;
  setSelectedFile: (selectedFile: any[]) => void;
  setGeneratedFile: (generatedFile: GenerateFileViewModel[]) => void;
}

const FormPageModel = create<IFormPageModel>((set) => ({
  documentType: '',
  document: null,
  field: [],
  selectedFile: [],
  generatedFile: [],
  setDocumentType: (documentType: 'file' | 'folder' | '') => set({ documentType }),
  setDocument: (document: any) => set({ document }),
  setField: (field: FieldViewModel[]) => set({ field }),
  setSelectedFile: (selectedFile: any[]) => set({ selectedFile }),
  setGeneratedFile: (generatedFile: GenerateFileViewModel[]) => set({ generatedFile }),
}))

export default FormPageModel;