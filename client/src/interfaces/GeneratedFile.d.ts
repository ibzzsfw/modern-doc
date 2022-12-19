import ISystemFile from "@interfaces/SystemFiles";
import FieldViewModel from "@view-models/Field.viewmodel";

interface IGenerateFile extends ISystemFile {
  private fields?: FieldViewModel[];
}

export default IGenerateFile;