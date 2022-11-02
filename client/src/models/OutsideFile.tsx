class OutsideFile extends File {

  dateExpires: Date;

  constructor(id: string, lastModified: Date, lastViewed: Date, dateExpires: Date, officialName: string) {
    super(id, lastModified, lastViewed, officialName);
    this.dateExpires = dateExpires;
  }
}

export default OutsideFile