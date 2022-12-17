import TagType from "../types/Tag";

class TagViewModel implements TagType {
  id
  name

  constructor(arg: TagType) {
    this.id = arg.id;
    this.name = arg.name;
  }
}

export default TagViewModel;