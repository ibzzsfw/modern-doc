import Sharable from "@view-models/Sharable";
import SystemFileType from "@interfaces/SystemFiles";
import FileViewModel from "@view-models/Files.viewmodel";

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
  }

  unshare = () => {
  }
}

export default SystemFileViewModel;