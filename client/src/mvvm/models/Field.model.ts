import create from "zustand/react";
import FieldViewModel from "../viewmodels/Field.viewmodel";

interface FieldModel {
  field: FieldViewModel[],
  setField: (field: FieldViewModel[]) => void,
}

const useFieldModel = create<FieldModel>((set) => ({
  field: [],
  setField: (field: FieldViewModel[]) => set({ field }),
}))

export default useFieldModel;