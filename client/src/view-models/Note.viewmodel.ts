import NoteType from "@interfaces/Note";
import Sharable from "@view-models/Sharable";

class NoteViewModel implements NoteType, Sharable {
  id
  heading
  content
  createdDate
  modifiedDate
  shareData: Date = new Date();

  constructor(arg: NoteType) {
    this.id = arg.id;
    this.heading = arg.heading;
    this.content = arg.content;
    this.createdDate = arg.createdDate;
    this.modifiedDate = arg.modifiedDate;
  }

  share = () => {
  }
  
  unshare = () => {
  }
}

export default NoteViewModel;