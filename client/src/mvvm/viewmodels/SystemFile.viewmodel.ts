import Sharable from "src/view-models/Sharable";
import SystemFileType from "../types/SystemFiles";
import FileViewModel from "./Files.viewmodel";

class SystemFileViewModel extends FileViewModel implements SystemFileType, Sharable {
  name
  dayLifeSpan
  tagId
  shareData: Date = new Date();

  constructor(arg: SystemFileType) {
    super(arg);
    this.name = arg.name;
    this.dayLifeSpan = arg.dayLifeSpan;
    this.tagId = arg.tagId
  }

  share = () => {
    this.shareData = new Date();
  }

  unshare = () => {
  }
}

export default SystemFileViewModel;