import FilesType from "@interfaces/File";
import DocumentViewModel from "@view-models/Document.viewmodel";

type DocumentStatus =
  | 'หมดอายุ'
  | 'มีอยู่ในคลัง'
  | 'ใกล้หมดอายุ'
  | 'ไม่มีอยู่ในคลัง'
abstract class FileViewModel extends DocumentViewModel implements FilesType {
  officialName;
  URI
  previewURI
  type
  // lastModified;

  constructor(arg: FilesType) {
    super(arg);
    this.officialName = arg.officialName;
    this.URI = arg.URI;
    this.previewURI = arg.previewURI;
    this.type = arg.type;
    // this.lastModified = arg.lastModified;
  }

  getStatus(): DocumentStatus {
    const today = new Date()
    if (
      (this.URI != null &&
        this.URI != '' &&
        this.type == 'uploadedFile') ||
      (this.type == 'generatedFile' && this.dateUpload != null)
    ) {
      return 'มีอยู่ในคลัง'
    }
    if (this.URI == '' || this.URI == null) {
      return 'ไม่มีอยู่ในคลัง'
    }
    // if (this.expirationDate < today) {
    //   return 'หมดอายุ'
    // }
    return 'มีอยู่ในคลัง'
  }
}

export default FileViewModel;