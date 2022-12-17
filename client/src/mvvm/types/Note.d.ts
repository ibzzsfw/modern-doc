interface NoteType {
  id: string;
  heading?: string;
  content?: string;
  createdDate?: Date;
  modifiedDate?: Date;
}

export default NoteType;