import TagViewModel from "@view-models/Tag.viewmodel";
import IFile from "@interfaces/File";

interface ISystemFile extends IFile {
  name?: string;
  dayLifeSpan?: number;
  tag?: TagViewModel[];
}

export default ISystemFile;