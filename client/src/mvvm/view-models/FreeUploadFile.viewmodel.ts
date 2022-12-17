import FreeUploadedFileType from "../types/FreeUploadedFile";
import FileViewModel from "./Files.viewmodel";

class FreeUploadedFileViewModel extends FileViewModel implements FreeUploadedFileType {
  dateExpired;

  constructor(arg: FreeUploadedFileType) {
    super(arg);
    this.dateExpired = arg.dateExpired;
  }
}

export default FreeUploadedFileViewModel;