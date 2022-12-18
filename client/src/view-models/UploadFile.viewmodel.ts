import IUploadFile from "@interfaces/UploadFile";
import SystemFileViewModel from "@view-models/SystemFile.viewmodel";

class UploadFileViewModel extends SystemFileViewModel implements IUploadFile {
  constructor(arg: IUploadFile) {
    super(arg);
    this.type = 'uploadedFile'
  }
}

export default UploadFileViewModel;