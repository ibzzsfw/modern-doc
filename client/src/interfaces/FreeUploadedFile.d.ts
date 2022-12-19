import IFile from "@interfaces/File";

interface IFreeUploadFile extends IFile {
  private dateExpired?: Date;
}

export default IFreeUploadFile;