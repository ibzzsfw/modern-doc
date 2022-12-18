import UploadFileViewModel from "@view-models/UploadFile.viewmodel";
import GenerateFileViewModel from "@view-models/GenerateFiles.viewmodel";
import TagViewModel from "@view-models/Tag.viewmodel";
import IDocument from "@interfaces/Document";

type fileDetails = {
  file: UploadFileViewModel | GenerateFileViewModel;
  amount: number;
  remark: string;
}

interface IFolder extends IDocument {
  name?: string;
  officialName?: string;
  file?: fileDetails[];
  tagId?: TagViewModel[];
  type?: string;
}

export default IFolder;