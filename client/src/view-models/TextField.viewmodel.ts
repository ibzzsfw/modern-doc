import FieldModel from "@view-models/Field.viewmodel";
import FieldType from "@interfaces/Field";
import * as Yup from "yup";

class TextFieldViewModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
    super(arg);
    this.type = "text";
  }

  validationSchema = () => this.addRequired(Yup.string())

  initialValue = () => this.userValue ?? '';

}

export default TextFieldViewModel;