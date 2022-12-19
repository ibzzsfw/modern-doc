import IDocument from "@interfaces/Document";
import GenerateFileViewModel from "@view-models/GenerateFiles.viewmodel";
import TagViewModel from "@view-models/Tag.viewmodel";
import UploadFileViewModel from "@view-models/UploadFile.viewmodel";

type fileDetails = {
  file: UploadFileViewModel | GenerateFileViewModel;
  amount: number;
  remark: string;
}

interface IFolder extends IDocument {
  private name?: string;
  private officialName?: string;
  private file?: fileDetails[];
  private tagId?: TagViewModel[];
  private type?: string;
}

export default IFolder;