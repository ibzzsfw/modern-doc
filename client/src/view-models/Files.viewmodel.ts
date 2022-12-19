import IFile from "@interfaces/File";
import DocumentViewModel from "@view-models/Document.viewmodel";

type DocumentStatus = 'หมดอายุ'
  | 'มีอยู่ในคลัง'
  | 'ใกล้หมดอายุ'
  | 'ไม่มีอยู่ในคลัง'
abstract class FileViewModel extends DocumentViewModel implements IFile {
  officialName;
  URI
  previewURI
  type
  isShared

  constructor(arg: IFile) {
    super(arg);
    this.officialName = arg.officialName;
    this.URI = arg.URI;
    this.previewURI = arg.previewURI;
    this.type = arg.type;
    this.isShared = arg.isShared;
  }

  getStatus(): DocumentStatus {
    if (this.type == 'generatedFile' && this.URI != '') {
      return 'ไม่มีอยู่ในคลัง'
    } else if (this.type == 'uploadedFile' && this.URI == null) {
      return 'ไม่มีอยู่ในคลัง'
    }
    return 'มีอยู่ในคลัง'
  }
}

export default FileViewModel;