import FolderType from "../types/Folder";

class FolderViewModel implements FolderType {
  name
  file
  note
  tag
  dateCreated

  constructor(arg: FolderType) {
    this.name = arg.name;
    this.file = arg.file;
    this.note = arg.note;
    this.tag = arg.tag;
    this.dateCreated = arg.dateCreated;
  }
}

export default FolderViewModel;