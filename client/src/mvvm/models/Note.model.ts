import create from "zustand/react";
import NoteViewModel from "../view-models/Note.viewmodel";

interface INoteModel {
  note: NoteViewModel[],
  setNote: (note: NoteViewModel[]) => void,
}

const NoteModel = create<INoteModel>((set) => ({
  note: [],
  setNote: (note: NoteViewModel[]) => set({ note }),
}))

export default NoteModel;