import FilesType from "@interfaces/File";

interface FreeUploadFileType extends FilesType {
  dateExpired?: Date;
}

export default FreeUploadFileType;