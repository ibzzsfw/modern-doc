import UploadFileType from "@interfaces/UploadFile";
import SystemFileViewModel from "@view-models/SystemFile.viewmodel";

class UploadFileViewModel extends SystemFileViewModel implements UploadFileType {
  constructor(arg: UploadFileType) {
    super(arg);
    this.type = 'uploadedFile'
  }
}

export default UploadFileViewModel;