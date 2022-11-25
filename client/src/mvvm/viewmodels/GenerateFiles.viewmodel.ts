import GenerateFileType from "../types/GeneratedFile";
import SystemFileViewModel from "./SystemFile.viewmodel";

class GenerateFileViewModel extends SystemFileViewModel implements GenerateFileType {
  fieldId

  constructor(arg: GenerateFileType) {
    super(arg);
    this.fieldId = arg.fieldId;
  }
}

export default GenerateFileViewModel;