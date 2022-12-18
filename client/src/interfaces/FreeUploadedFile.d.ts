import IFile from "@interfaces/File";

interface IFreeUploadFile extends IFile {
  dateExpired?: Date;
}

export default IFreeUploadFile;