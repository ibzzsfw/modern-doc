import create from "zustand/react";
import GenerateFilesViewModel from "../viewmodels/GenerateFiles.viewmodel";
import UploadFileViewModel from "../viewmodels/UploadFile.viewmodel";
import FreeUploadFileViewModel from "../viewmodels/FreeUploadFile.viewmodel";

interface GeneratedFilesModel {
  generatedFiles: GenerateFilesViewModel[],
  uploadFile: UploadFileViewModel[],
  freeUploadFile: FreeUploadFileViewModel[],
  setGeneratedFiles: (generatedFiles: GenerateFilesViewModel[]) => void,
  setUploadFile: (uploadFile: UploadFileViewModel[]) => void,
  setFreeUploadFile: (freeUploadFile: FreeUploadFileViewModel[]) => void,
}

const useGeneratedFilesModel = create<GeneratedFilesModel>((set) => ({
  generatedFiles: [],
  uploadFile: [],
  freeUploadFile: [],
  setGeneratedFiles: (generatedFiles: GenerateFilesViewModel[]) => set({ generatedFiles }),
  setUploadFile: (uploadFile: UploadFileViewModel[]) => set({ uploadFile }),
  setFreeUploadFile: (freeUploadFile: FreeUploadFileViewModel[]) => set({ freeUploadFile }),
}))

export default useGeneratedFilesModel;