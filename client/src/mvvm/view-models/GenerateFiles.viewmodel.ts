import GenerateFileType from "../types/GeneratedFile";
import SystemFileViewModel from "./SystemFile.viewmodel";

class GenerateFileViewModel extends SystemFileViewModel implements GenerateFileType {
  fields
  
  constructor(arg: GenerateFileType) {
    super(arg);
    this.fields = arg.fields;
  }

  share = () => {
  }

  unshare = () => {
  }
}

export default GenerateFileViewModel;