import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";
import * as Yup from "yup";

class AgeFieldViewModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
    super(arg);
    this.type = "age";
  }

  validationSchema = () => this.addRequired(Yup.string())

  initialValue = () => this.userValue ?? '';

}

export default AgeFieldViewModel;