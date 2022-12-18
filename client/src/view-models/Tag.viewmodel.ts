import ITag from "@interfaces/Tag";

class TagViewModel implements ITag {
  id
  name

  constructor(arg: ITag) {
    this.id = arg.id;
    this.name = arg.name;
  }
}

export default TagViewModel;