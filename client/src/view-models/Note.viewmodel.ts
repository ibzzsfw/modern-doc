import INote from "@interfaces/Note";

class NoteViewModel implements INote {
  id
  heading
  content
  createdDate
  modifiedDate

  constructor(arg: INote) {
    this.id = arg.id;
    this.heading = arg.heading;
    this.content = arg.content;
    this.createdDate = arg.createdDate;
    this.modifiedDate = arg.modifiedDate;
  }

}

export default NoteViewModel;