import FieldModel from "@view-models/Field.viewmodel";
import IField from "@interfaces/Field";
import * as Yup from "yup";

class NumberFieldViewModel extends FieldModel implements IField {
  constructor(arg: IField) {
    super(arg);
    this.type = "number";
  }

  validationSchema = () => this.addRequired(
    Yup.string()
      .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
      .required('จำเป็นต้องกรอกตัวเลข')
  )

  initialValue = () => this.userValue ?? '';

}

export default NumberFieldViewModel;