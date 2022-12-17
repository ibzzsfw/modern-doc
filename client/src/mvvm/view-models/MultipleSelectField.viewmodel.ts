import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";
import * as Yup from "yup";

class MultipleSelectFieldViewModel extends FieldModel implements FieldType {

  constructor(arg: FieldType) {
    super(arg);
    this.type = "multipleSelect";
  }

  validate = () => {
    return {
      isValid: true,
      message: ''
    };
  }

  validationSchema = () => Yup.array().required(
    'เลือกอย่างน้อย 1 ตัวเลือก'
  )

  initialValue = () => this.userValue ?? [];
}

export default MultipleSelectFieldViewModel;