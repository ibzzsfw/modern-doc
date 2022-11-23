import create from "zustand/react";
import NoteViewModel from "../viewmodels/Note.viewmodel";

interface NoteModel {
  note: NoteViewModel[],
  setNote: (note: NoteViewModel[]) => void,
}

const useNoteModel = create<NoteModel>((set) => ({
  note: [],
  setNote: (note: NoteViewModel[]) => set({ note }),
}))

export default useNoteModel;