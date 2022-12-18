import create from "zustand/react";
import FieldViewModel from "@view-models/Field.viewmodel";

interface IFieldModel {
  field: FieldViewModel[],
  setField: (field: FieldViewModel[]) => void,
}

const FieldModel = create<IFieldModel>((set) => ({
  field: [],
  setField: (field: FieldViewModel[]) => set({ field }),
}))

export default FieldModel;