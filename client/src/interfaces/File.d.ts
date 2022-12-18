import IDocument from "@interfaces/Document";

interface IFile extends IDocument {
  lastModified?: Date;
  URI?: string;
  previewURI?: string
  type?: 'generatedFile' | 'uploadedFile' | 'userFreeUploadFile';
  isShared?: boolean;
}

export default IFile;