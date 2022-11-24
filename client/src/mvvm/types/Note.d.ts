interface NoteType {
  id: string;
  title?: string;
  content?: string;
  dateCreated?: Date;
  dateModified?: Date;
}

export default NoteType;