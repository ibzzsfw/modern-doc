import UploadFileViewModel from "../viewmodels/UploadFile.viewmodel";
import GenerateFileViewModel from "../viewmodels/GenerateFiles.viewmodel";
import TagViewModel from "../viewmodels/Tag.viewmodel";

type fileDetails = {
  file: UploadFileViewModel | GenerateFileViewModel;
  amount: number;
  remarks: string;
}

interface FolderType {
  file: fileDetails[];
  note: string;
  tag: TagViewModel[];
  dateCreated: string;
}

export default FolderType;
