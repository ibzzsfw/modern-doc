import FieldType from "../types/Field";

abstract class FieldViewModel implements FieldType {
  id
  name
  type
  officialName
  description
  choices
  userValue
  date
  generatedFileId
  isRequired
  order

  constructor(arg: FieldType) {
    this.id = arg.id;
    this.name = arg.name;
    this.type = arg.type;
    this.officialName = arg.officialName;
    this.description = arg.description;
    this.choices = arg.choices;
    this.userValue = arg.userValue;
    this.date = arg.date;
    this.generatedFileId = arg.generatedFileId;
    this.isRequired = arg.isRequired;
    this.order = arg.order;
  }

  abstract validationSchema: () => any;

  abstract initialValue: () => string | number | Date | string[];

  addRequired = (YupSchema: any) => {
    if (this.isRequired) {
      return YupSchema.required('จำเป็นต้องกรอก')
    }
    return YupSchema
  }

}

export default FieldViewModel;