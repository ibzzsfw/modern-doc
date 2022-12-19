interface INote {
  private id: string;
  private heading?: string;
  private content?: string;
  private createdDate?: Date;
  private modifiedDate?: Date;
}

export default INote;