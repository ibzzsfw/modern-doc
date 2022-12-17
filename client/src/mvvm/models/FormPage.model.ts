import create from "zustand";
import GenerateFileViewModel from "../view-models/GenerateFiles.viewmodel";
import FolderViewModel from "../view-models/Folder.viewmodel";
import FieldViewModel from '../view-models/Field.viewmodel'
// import DateFieldViewModel from '../view-models/DateField.viewmodel'
// import TextFieldViewModel from '../view-models/TextField.viewmodel'
// import NumberFieldViewModel from '../view-models/NumberField.viewmodel'
// import EmailFieldViewModel from '../view-models/EmailField.viewmodel'
// import PhoneNumberFieldViewModel from '../view-models/PhoneNumberField.viewmodel'
// import SingleSelectFieldViewModel from '../view-models/SingleSelectField.viewmodel'
// import MultipleSelectFieldViewModel from '../view-models/MultipleSelectField.viewmodel'
// import AgeFieldViewModel from '../view-models/AgeField.viewmodel'

// type fieldType = TextFieldViewModel
//   | NumberFieldViewModel
//   | EmailFieldViewModel
//   | PhoneNumberFieldViewModel
//   | DateFieldViewModel
//   | SingleSelectFieldViewModel
//   | MultipleSelectFieldViewModel
//   | AgeFieldViewModel

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