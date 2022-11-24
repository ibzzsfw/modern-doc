import create from "zustand/react";
import FolderViewModel from "../viewmodels/Folder.viewmodel";

interface IFolderModel {
  folder: FolderViewModel[],
  setFolder: (folder: FolderViewModel[]) => void,
}

const FolderModel = create<IFolderModel>((set) => ({
  folder: [],
  setFolder: (folder: FolderViewModel[]) => set({ folder }),
}))

export default FolderModel;