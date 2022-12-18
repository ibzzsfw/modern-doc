import IGenerateFile from "@interfaces/GeneratedFile";
import SystemFileViewModel from "@view-models/SystemFile.viewmodel";

class GenerateFileViewModel extends SystemFileViewModel implements IGenerateFile {
  fields
  
  constructor(arg: IGenerateFile) {
    super(arg);
    this.fields = arg.fields;
    this.type = 'generatedFile'
  }
}

export default GenerateFileViewModel;