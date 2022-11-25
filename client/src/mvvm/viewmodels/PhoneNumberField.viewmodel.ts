import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";

class PhoneNumberFieldModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
    super(arg);
    this.type = "phoneNumber";
  }

  validate = () => {
    return {
      // check phone number regex start with 0 and 10 digits
      isValid: this.value ? this.value.match(/^0[0-9]{9}$/) : true,
      message: this.value ? this.value.match(/^0[0-9]{9}$/) ? "" : "Invalid phone number" : "",
    };
  };

  iniialValue = () => "";

}

export default PhoneNumberFieldModel;