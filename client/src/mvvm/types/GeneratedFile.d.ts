import SystemFileType from "./SystemFiles";
import FieldViewModel from "./Field.viewmodel";

interface GenerateFileType extends SystemFileType {
  fieldId?: string[];
}

export default GenerateFileType;