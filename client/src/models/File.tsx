abstract class File {

  id: string;
  lastModified: Date;
  lastViewed: Date;
  officialName: string;

  constructor(id: string, lastModified: Date, lastViewed: Date, officialName: string) {
    this.id = id;
    this.lastModified = lastModified;
    this.lastViewed = lastViewed;
    this.officialName = officialName;
  }
}

export default File