import create from "zustand";
import FolderViewModel from "../view-models/Folder.viewmodel";
import UploadFileViewModel from '../view-models/UploadFile.viewmodel'
import GenerateFileViewModel from '../view-models/GenerateFiles.viewmodel'

type fileType = GenerateFileViewModel | UploadFileViewModel

interface IFolderPageModel {
  folder: FolderViewModel | null,
  file: fileType[],
  setFolder: (folder: FolderViewModel | null) => void,
  setFile: (file: fileType[]) => void,
}

const FolderPageModel = create<IFolderPageModel>((set) => ({
  folder: null,
  file: [],
  setFolder: (folder: FolderViewModel | null) => set({ folder }),
  setFile: (file: fileType[]) => set({ file }),
}));

export default FolderPageModel;