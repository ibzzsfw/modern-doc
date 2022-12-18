import ISystemFile from "@interfaces/SystemFiles";
import FileViewModel from "@view-models/Files.viewmodel";

class SystemFileViewModel extends FileViewModel implements ISystemFile {
  name
  dayLifeSpan
  tag

  constructor(arg: ISystemFile) {
    super(arg);
    this.name = arg.name;
    this.dayLifeSpan = arg.dayLifeSpan;
    this.tag = arg.tag
  }
}

export default SystemFileViewModel;