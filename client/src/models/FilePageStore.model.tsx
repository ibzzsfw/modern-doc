import create from 'zustand'
import File from '@view-models/File'

/**
 * @interface IFilePageModel
 * @description FilePageModel interface for files
 * @property {File} file - current file
 * @property {function} setFile - set current file
 */
interface IFilePageModel {
  file: File
  setFile(file: File): void
}

export const FilePageModel = create<IFilePageModel>((set) => ({
  file: new File(),
  setFile: (file: File) => set({ file }),
}))