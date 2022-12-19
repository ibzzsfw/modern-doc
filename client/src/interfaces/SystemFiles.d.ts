import IFile from "@interfaces/File";
import TagViewModel from "@view-models/Tag.viewmodel";

interface ISystemFile extends IFile {
  private name?: string;
  private dayLifeSpan?: number;
  private tag?: TagViewModel[];
}

export default ISystemFile;