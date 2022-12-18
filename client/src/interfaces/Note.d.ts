interface INote {
  id: string;
  heading?: string;
  content?: string;
  createdDate?: Date;
  modifiedDate?: Date;
}

export default INote;