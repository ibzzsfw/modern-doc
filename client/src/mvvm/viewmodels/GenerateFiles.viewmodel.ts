import GenerateFileType from "../types/GeneratedFile";
import SystemFileViewModel from "./SystemFile.viewmodel";

class GenerateFileViewModel extends SystemFileViewModel implements GenerateFileType {
  field

  constructor(arg: GenerateFileType) {
    super(arg);
    this.field = arg.field;
  }
}

export default GenerateFileViewModel;