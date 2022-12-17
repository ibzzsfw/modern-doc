import SystemFileType from "./SystemFiles";
import FieldViewModel from "./Field.viewmodel";

interface GenerateFileType extends SystemFileType {
  fields?: FieldViewModel[];
}

export default GenerateFileType;