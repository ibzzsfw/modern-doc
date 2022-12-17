import FolderType from "../types/Folder";
import DocumentViewModel from "./Document.viewmodel";

class FolderViewModel extends DocumentViewModel implements FolderType {
  name;
  officialName;
  file;
  tagId;
  type;

  constructor(arg: FolderType) {
    super(arg);
    this.name = arg.name;
    this.officialName = arg.officialName;
    this.file = arg.file;
    this.tagId = arg.tagId;
    this.type = arg.type;
  }
}

export default FolderViewModel;