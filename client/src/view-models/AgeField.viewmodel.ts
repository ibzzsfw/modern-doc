import FieldViewModel from "@view-models/Field.viewmodel";
import IField from "@interfaces/Field";
import * as Yup from "yup";

class AgeFieldViewModel extends FieldViewModel {
  constructor(arg: IField) {
    super(arg);
    this.type = "age";
  }

  validationSchema = () => this.addRequired(Yup.string())

  initialValue = () => this.userValue ?? '';

}

export default AgeFieldViewModel;