import UploadFileViewModel from "../viewmodels/UploadFile.viewmodel";
import GenerateFileViewModel from "../viewmodels/GenerateFiles.viewmodel";
import TagViewModel from "../viewmodels/Tag.viewmodel";


type fileDetails = {
  fileId: string[];
  amount: number;
  remark: string;
}

interface FolderType {
  name?: string;
  file?: fileDetails[];
  note?: string;
  tagId?: string[];
  dateCreated?: string;
}

export default FolderType;