import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";

class EmailFieldModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
    super(arg);
    this.type = "email";
  }

  validate = () => {
    return {
      // check email regex
      isValid: this.value ? this.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) : true,
      message: this.value ? this.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? "" : "Invalid email" : "",
    };
  };

  iniialValue = () => "";

}

export default EmailFieldModel;