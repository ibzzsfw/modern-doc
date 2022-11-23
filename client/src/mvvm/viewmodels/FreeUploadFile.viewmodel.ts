import FreeUploadFileType from "src/mvvm/types/FreeUploadFile";
import FileViewModel from "./Files.viewmodel";

class FreeUploadFileViewModel extends FileViewModel implements FreeUploadFileType {
  dateExpired;

  constructor(arg: FreeUploadFileType) {
    super(arg);
    this.dateExpired = arg.dateExpired;
  }
}

export default FreeUploadFileViewModel;