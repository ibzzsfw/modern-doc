import TagViewModel from "../view-models/Tag.viewmodel";
import FilesType from "./File";

interface SystemFileType extends FilesType {
  name?: string;
  dayLifeSpan?: number;
  tag?: TagViewModel[];
}

export default SystemFileType;