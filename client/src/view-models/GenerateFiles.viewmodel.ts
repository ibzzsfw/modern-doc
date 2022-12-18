import GenerateFileType from "@interfaces/GeneratedFile";
import SystemFileViewModel from "@view-models/SystemFile.viewmodel";

class GenerateFileViewModel extends SystemFileViewModel implements GenerateFileType {
  fields
  
  constructor(arg: GenerateFileType) {
    super(arg);
    this.fields = arg.fields;
    this.type = 'generatedFile'
  }

  share = () => {
  }

  unshare = () => {
  }
}

export default GenerateFileViewModel;