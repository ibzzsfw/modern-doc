import AgeFieldViewModel from '@view-models/AgeField.viewmodel';
import DateFieldViewModel from '@view-models/DateField.viewmodel';
import EmailFieldViewModel from '@view-models/EmailField.viewmodel';
import FreeUploadedFileViewModel from '@view-models/FreeUploadFile.viewmodel';
import GenerateFileViewModel from '@view-models/GenerateFiles.viewmodel';
import MultipleSelectFieldViewModel from '@view-models/MultipleSelectField.viewmodel';
import NumberFieldViewModel from '@view-models/NumberField.viewmodel';
import PhoneNumberFieldViewModel from '@view-models/PhoneNumberField.viewmodel';
import SingleSelectFieldViewModel from '@view-models/SingleSelectField.viewmodel';
import TextFieldViewModel from '@view-models/TextField.viewmodel';
import UploadFileViewModel from '@view-models/UploadFile.viewmodel';
import create from "zustand";

type fieldType = TextFieldViewModel
  | NumberFieldViewModel
  | EmailFieldViewModel
  | PhoneNumberFieldViewModel
  | DateFieldViewModel
  | SingleSelectFieldViewModel
  | MultipleSelectFieldViewModel
  | AgeFieldViewModel

type fileType = GenerateFileViewModel
  | UploadFileViewModel
  | FreeUploadedFileViewModel

interface IFilePageModel {
  file: fileType | null;
  field: fieldType[];
  sharedFileType: string;
  setFile: (file: fileType | null) => void;
  setField: (field: fieldType[]) => void;
  setSharedFileType: (sharedFileType: string) => void;
}

const FilePageModel = create<IFilePageModel>((set) => ({
  file: null,
  field: [],
  sharedFileType: '',
  setFile: (file: fileType | null) => set({ file }),
  setField: (field: fieldType[]) => set({ field }),
  setSharedFileType: (sharedFileType: string) => set({ sharedFileType })
}))

export default FilePageModel;