import FieldType from "../types/Field";

abstract class FieldViewModel implements FieldType {
  id
  name
  type
  officialName
  description
  value

  constructor(arg: FieldType) {
    this.id = arg.id;
    this.name = arg.name;
    this.type = arg.type;
    this.officialName = arg.officialName;
    this.description = arg.description;
    this.value = arg.value;
  }

  abstract validate: () => object;

  abstract iniialValue: () => string | number | Date | string[];

}

export default FieldViewModel;