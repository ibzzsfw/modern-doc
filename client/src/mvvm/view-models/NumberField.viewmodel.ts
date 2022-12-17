import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";
import * as Yup from "yup";

class NumberFieldViewModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
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