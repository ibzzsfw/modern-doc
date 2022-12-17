import FilesType from "../types/File";
import DocumentViewModel from "./Document.viewmodel";

abstract class FileViewModel extends DocumentViewModel implements FilesType {
  officialName;
  URI
  previewURI
  // lastModified;

  constructor(arg: FilesType) {
    super(arg);
    this.officialName = arg.officialName;
    this.URI = arg.URI;
    this.previewURI = arg.previewURI;
    // this.lastModified = arg.lastModified;
  }
}

export default FileViewModel;