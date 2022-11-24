import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";

class DateFieldModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
    super(arg);
    this.type = "date";
  }

  validate = () => {
    return {
      isValid: this.value ? !isNaN(Date.parse(this.value)) : true,
      message: this.value ? !isNaN(Date.parse(this.value)) ? "" : "Invalid date" : "",
    };
  };

  iniialValue = () => new Date();

}

export default DateFieldModel;