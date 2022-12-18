import FreeUploadedFileType from "@interfaces/FreeUploadedFile";
import FileViewModel from "@view-models/Files.viewmodel";

class FreeUploadedFileViewModel extends FileViewModel implements FreeUploadedFileType {
  dateExpired;

  constructor(arg: FreeUploadedFileType) {
    super(arg);
    this.dateExpired = arg.dateExpired;
    this.type = 'userFreeUploadFile'
  }
}

export default FreeUploadedFileViewModel;