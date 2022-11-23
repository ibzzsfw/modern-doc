import Sharable from "@models/Sharable";
import SystemFileType from "../types/SystemFiles";
import FileViewModel from "./Files.viewmodel";

class SystemFileViewModel extends FileViewModel implements SystemFileType, Sharable {
  name
  dayLifeSpan
  tag
  shareData: Date = new Date();

  constructor(arg: SystemFileType) {
    super(arg);
    this.name = arg.name;
    this.dayLifeSpan = arg.dayLifeSpan;
    this.tag = arg.tag
  }

  share = () => {
    this.shareData = new Date();
  }

  unshare = () => {
  }
}

export default SystemFileViewModel;