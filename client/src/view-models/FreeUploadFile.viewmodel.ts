import IFreeUploadedFile from "@interfaces/FreeUploadedFile";
import FileViewModel from "@view-models/Files.viewmodel";

class FreeUploadedFileViewModel extends FileViewModel implements IFreeUploadedFile {
  dateExpired;

  constructor(arg: IFreeUploadedFile) {
    super(arg);
    this.dateExpired = arg.dateExpired;
    this.type = 'userFreeUploadFile'
  }
}

export default FreeUploadedFileViewModel;