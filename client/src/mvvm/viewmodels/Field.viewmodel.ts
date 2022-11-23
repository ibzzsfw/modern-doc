import FieldTypes from "../types/Field";

class FieldViewModel implements FieldTypes {
  id
  name
  type
  officialName
  description
  value

  constructor(arg: FieldTypes) {
    this.id = arg.id;
    this.name = arg.name;
    this.type = arg.type;
    this.officialName = arg.officialName;
    this.description = arg.description;
    this.value = arg.value;
  }
}

export default FieldViewModel;