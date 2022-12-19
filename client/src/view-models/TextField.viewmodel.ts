import IField from "@interfaces/Field";
import FieldModel from "@view-models/Field.viewmodel";
import * as Yup from "yup";

class TextFieldViewModel extends FieldModel implements IField {
  constructor(arg: IField) {
    super(arg);
    this.type = "text";
  }

  validationSchema = () => this.addRequired(Yup.string())

  initialValue = () => this.userValue ?? '';

}

export default TextFieldViewModel;