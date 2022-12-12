import create from "zustand";
import GeneratedFile from "@view-models/GeneratedFile";
import Field from "@view-models/Field";

type GeneratedFileStore = {
  generatedFile: GeneratedFile[],
  setGeneratedFile: (value: GeneratedFile[]) => void,
  generatedFileField: Field[],
  setGeneratedFileField: (value: Field[]) => void,
}

export const useGeneratedFileStore = create<GeneratedFileStore>((set) => ({
  generatedFile: [],
  setGeneratedFile: (value) => set({ generatedFile: value }),
  generatedFileField: [],
  setGeneratedFileField: (value) => set({ generatedFileField: value }),
}))