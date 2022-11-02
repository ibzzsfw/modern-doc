class Note implements Sharable {

  id: string;
  title: string;
  content: string;
  dateCreate: Date;
  shareDate?: Date;


  constructor(id: string, title: string, content: string, dateCreate: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.dateCreate = dateCreate;
  }

  share(): void {
    this.shareDate = new Date();
    // TODO: share note to family
  }

  unshare(): void {
    //   TODO: unshare note to family
  }
}

export default Note