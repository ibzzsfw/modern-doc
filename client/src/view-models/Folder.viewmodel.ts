import IFolder from "@interfaces/Folder";
import DocumentViewModel from "@view-models/Document.viewmodel";

class FolderViewModel extends DocumentViewModel implements IFolder {
  name;
  officialName;
  file;
  tagId;
  type;

  constructor(arg: IFolder) {
    super(arg);
    this.name = arg.name;
    this.officialName = arg.officialName;
    this.file = arg.file;
    this.tagId = arg.tagId;
    this.type = arg.type;
  }
}

export default FolderViewModel;