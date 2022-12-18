import create from "zustand";
import GeneratedFile from "@view-models/GeneratedFile";
import Field from "@view-models/Field";

/**
 * @interface IGeneratedFileModel
 * @description GeneratedFileModel interface especially for generated file in document and field
 * @property {GeneratedFile[]} generatedFile - current generated file
 * @property {Field[]} generatedFileField - current generated file field
 * @property {function} setGeneratedFile - set current generated file
 * @property {function} setGeneratedFileField - set current generated file field
 */
interface IGeneratedFileModel {
  generatedFile: GeneratedFile[],
  generatedFileField: Field[],
  setGeneratedFile: (value: GeneratedFile[]) => void,
  setGeneratedFileField: (value: Field[]) => void,
}

export const GeneratedFileModel = create<IGeneratedFileModel>((set) => ({
  generatedFile: [],
  generatedFileField: [],
  setGeneratedFile: (value) => set({ generatedFile: value }),
  setGeneratedFileField: (value) => set({ generatedFileField: value }),
}))