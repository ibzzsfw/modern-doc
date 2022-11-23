import create from "zustand/react";
import FolderViewModel from "../viewmodels/Folder.viewmodel";

interface FolderModel {
  folder: FolderViewModel[],
  setFolder: (folder: FolderViewModel[]) => void,
}

const useFolderModel = create<FolderModel>((set) => ({
  folder: [],
  setFolder: (folder: FolderViewModel[]) => set({ folder }),
}))

export default useFolderModel;