import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";
import * as Yup from "yup";

type Choice = {
  id: string;
  name: string;
  value: string;
}

class SingleSelectFieldViewModel extends FieldModel implements FieldType {

  constructor(arg: FieldType) {
    super(arg);
    this.type = "singleSelect";
  }

  validationSchema = () => this.addRequired(
    Yup.string()
      .oneOf(this.choices.map((choice: Choice) => choice.name))
      .required('เลือก 1 ตัวเลือก'))

  initialValue = () => this.userValue ?? '';
}

export default SingleSelectFieldViewModel;