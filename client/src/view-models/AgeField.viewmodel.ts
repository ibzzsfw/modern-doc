import FieldViewModel from "@view-models/Field.viewmodel";
import FieldType from "@interfaces/Field";
import * as Yup from "yup";

class AgeFieldViewModel extends FieldViewModel implements FieldType {
  constructor(arg: FieldType) {
    super(arg);
    this.type = "age";
  }

  validationSchema = () => this.addRequired(Yup.string())

  initialValue = () => this.userValue ?? '';

}

export default AgeFieldViewModel;