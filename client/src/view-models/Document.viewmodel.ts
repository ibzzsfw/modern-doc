import IDocument from "@interfaces/Document";

abstract class DocumentViewModel implements IDocument {
  id;
  dateUpload;
  description;
  note;

  constructor(arg: IDocument) {
    this.id = arg.id;
    this.dateUpload = arg.dateUpload;
    this.description = arg.description;
    this.note = arg.note;
  }
}

export default DocumentViewModel;