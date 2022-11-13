import SystemFile from "@models/SystemFile";
import Field from "@models/Field";

class GeneratedFile extends SystemFile {

  field: Field[] = [];

  constructor(
    id: string,
    lastModified: Date,
    lastViewed: Date,
    name: string,
    dayLifeSpan: number,
    officialName: string,
    field: Field[]
  ) {
    super(id, lastModified, lastViewed, name, dayLifeSpan, officialName);
    this.field = field;
  }
}

export default GeneratedFile;