import FilesType from "../types/File";
import DocumentViewModel from "./Document.viewmodel";

class FileViewModel extends DocumentViewModel implements FilesType {

  officialName;
  lastModified;

  constructor(arg: FilesType) {
    super(arg);
    this.officialName = arg.officialName;
    this.lastModified = arg.lastModified;
  }
}

export default FileViewModel;