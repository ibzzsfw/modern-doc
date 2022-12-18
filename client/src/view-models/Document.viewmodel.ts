import DocumentsType from "@interfaces/Document";

abstract class DocumentViewModel implements DocumentsType {
  id;
  dateUpload;
  description;
  note;

  constructor(arg: DocumentsType) {
    this.id = arg.id;
    this.dateUpload = arg.dateUpload;
    this.description = arg.description;
    this.note = arg.note;
  }
}

export default DocumentViewModel;