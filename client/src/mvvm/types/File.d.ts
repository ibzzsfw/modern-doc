import DocumentsType from "./Document";

interface FilesType extends DocumentsType {
  officialName: string;
  lastModified: Date;
}

export default FilesType;