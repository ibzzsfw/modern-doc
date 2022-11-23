import FilesType from "./File";

interface FreeUploadFileType extends FilesType {
  dateExpired: Date;
}

export default FreeUploadFileType;