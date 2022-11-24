import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";

class TextFieldModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
    super(arg);
    this.type = "text";
  }

  validate = () => {
    return {
      isValid: true,
      message: "",
    };
  };

  iniialValue = () => "";

}

export default TextFieldModel;