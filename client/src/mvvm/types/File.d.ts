import DocumentsType from "./Document";

interface FilesType extends DocumentsType {
  lastModified?: Date;
  URI?: string;
  previewURI?: string
}

export default FilesType;