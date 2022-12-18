import SystemFileType from "@interfaces/SystemFiles";
import FieldViewModel from "@view-models/Field.viewmodel";

interface GenerateFileType extends SystemFileType {
  fields?: FieldViewModel[];
}

export default GenerateFileType;