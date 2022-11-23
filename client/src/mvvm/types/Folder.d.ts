import UploadFileViewModel from "../viewmodels/UploadFile.viewmodel";
import GenerateFileViewModel from "../viewmodels/GenerateFiles.viewmodel";
import TagViewModel from "../viewmodels/Tag.viewmodel";

type SystemFiles = UploadFileViewModel | GenerateFileViewModel;

type fileDetails = {
  file: SystemFiles;
  amount: number;
  remark: string;
}

interface FolderType {
  name?: string;
  file?: fileDetails[];
  note?: string;
  tag?: TagViewModel[];
  dateCreated?: string;
}

export default FolderType;