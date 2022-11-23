import SystemFileType from "./SystemFiles";
import FieldViewModel from "./Field.viewmodel";

interface GenerateFileType extends SystemFileType {
  field: FieldViewModel[];
}

export default GenerateFileType;