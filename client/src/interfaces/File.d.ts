import IDocument from "@interfaces/Document";

interface IFile extends IDocument {
  private lastModified?: Date;
  private URI?: string;
  private previewURI?: string
  private type?: 'generatedFile' | 'uploadedFile' | 'userFreeUploadFile';
  private isShared?: boolean;
}

export default IFile;