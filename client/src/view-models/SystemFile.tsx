import Files from "./Files";

class SystemFile extends Files {

  name: string;
  dayLifeSpan: number;

  constructor(id: string, lastModified: Date, lastViewed: Date, name: string, dayLifeSpan: number, officialName: string) {
    super(id, lastModified, lastViewed, officialName);
    this.name = name;
    this.dayLifeSpan = dayLifeSpan;
  }
}

export default SystemFile