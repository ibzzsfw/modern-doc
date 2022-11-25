import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";

class NumberFieldModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
    super(arg);
    this.type = "number";
  }

  validate = () => {
    return {
      isValid: this.value ? !isNaN(Number(this.value)) : true,
      message: this.value ? !isNaN(Number(this.value)) ? "" : "Invalid number" : "",
    };
  };

  iniialValue = () => 0;

}

export default NumberFieldModel;