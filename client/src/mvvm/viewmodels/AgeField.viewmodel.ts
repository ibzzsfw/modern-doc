import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";

class AgeFieldModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
    super(arg);
    this.type = "age";
  }

  validate = () => {
    return {
      isValid: this.value ? !isNaN(Number(this.value)) : true,
      message: this.value ? !isNaN(Number(this.value)) ? "" : "Invalid number" : "",
    };
  };

  iniialValue = () => 1;

}

export default AgeFieldModel;