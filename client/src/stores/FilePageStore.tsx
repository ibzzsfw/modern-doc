import create from 'zustand'
import File from '@models/File'
type FilePageStore = {
  file: File
  setFile(file: File): void
}

export const useFilePageStore = create<FilePageStore>((set) => ({
  file: new File(),
  setFile: (file: File) => set({ file }),
}))
