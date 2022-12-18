import DocumentsType from "@interfaces/Document";

interface FilesType extends DocumentsType {
  lastModified?: Date;
  URI?: string;
  previewURI?: string
  type?: 'generatedFile' | 'uploadedFile' | 'userFreeUploadFile';
}

export default FilesType;