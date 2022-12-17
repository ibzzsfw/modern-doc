import UploadFileType from "../types/UploadFile";
import SystemFileViewModel from "./SystemFile.viewmodel";

class UploadFileViewModel extends SystemFileViewModel implements UploadFileType {
  constructor(arg: UploadFileType) {
    super(arg);
  }
}

export default UploadFileViewModel;