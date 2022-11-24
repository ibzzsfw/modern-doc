import FolderType from "../types/Folder";

class FolderViewModel implements FolderType {
  name
  file
  note
  tagId
  dateCreated

  constructor(arg: FolderType) {
    this.name = arg.name;
    this.file = arg.file;
    this.note = arg.note;
    this.tagId = arg.tagId;
    this.dateCreated = arg.dateCreated;
  }
}

export default FolderViewModel;