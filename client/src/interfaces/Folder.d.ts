import UploadFileViewModel from "@view-models/UploadFile.viewmodel";
import GenerateFileViewModel from "@view-models/GenerateFiles.viewmodel";
import TagViewModel from "@view-models/Tag.viewmodel";
import DocumentsType from "@interfaces/Document";

type fileDetails = {
  file: UploadFileViewModel | GenerateFileViewModel;
  amount: number;
  remark: string;
}

interface FolderType extends DocumentsType {
  name?: string;
  officialName?: string;
  file?: fileDetails[];
  tagId?: string[];
  type?: string;
}

export default FolderType;