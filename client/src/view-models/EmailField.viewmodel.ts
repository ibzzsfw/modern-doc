import IField from "@interfaces/Field";
import FieldViewModel from "@view-models/Field.viewmodel";
import * as Yup from "yup";

class EmailFieldViewModel extends FieldViewModel implements IField {
  constructor(arg: IField) {
    super(arg);
    this.type = "email";
  }

  validationSchema = () => this.addRequired(
    Yup.string()
      .required('จำเป็นต้องกรอก')
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        'กรุณากรอกอีเมลให้ถูกต้อง'
      )
  )

  initialValue = () => this.userValue ?? ''

}

export default EmailFieldViewModel;