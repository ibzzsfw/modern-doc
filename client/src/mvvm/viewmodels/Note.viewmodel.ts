import NoteType from "../types/Note";
import Sharable from "./Sharable";

class NoteViewModel implements NoteType, Sharable {
  id
  title
  content
  dateCreated
  dateModified
  shareData: Date = new Date();

  constructor(arg: NoteType) {
    this.id = arg.id;
    this.title = arg.title;
    this.content = arg.content;
    this.dateCreated = arg.dateCreated;
    this.dateModified = arg.dateModified;
  }

  share = () => {
    this.shareData = new Date();
  }
  
  unshare = () => {
  }
}

export default NoteViewModel;