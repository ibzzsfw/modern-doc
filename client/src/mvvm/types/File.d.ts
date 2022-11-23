import DocumentsType from "./Document";

interface FilesType extends DocumentsType {
  lastModified?: Date;
}

export default FilesType;