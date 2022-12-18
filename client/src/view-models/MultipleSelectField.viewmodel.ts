import FieldModel from "@view-models/Field.viewmodel";
import IField from "@interfaces/Field";
import * as Yup from "yup";

class MultipleSelectFieldViewModel extends FieldModel implements IField {

  constructor(arg: IField) {
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