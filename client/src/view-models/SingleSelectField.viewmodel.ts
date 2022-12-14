import IField from "@interfaces/Field";
import FieldModel from "@view-models/Field.viewmodel";
import * as Yup from "yup";

type Choice = {
  id: string;
  name: string;
  value: string;
}

class SingleSelectFieldViewModel extends FieldModel implements IField {

  constructor(arg: IField) {
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