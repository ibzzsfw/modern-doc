import FieldModel from "@view-models/Field.viewmodel";
import IField from "@interfaces/Field";
import * as Yup from "yup";

class PhoneNumberFieldViewModel extends FieldModel implements IField {
  constructor(arg: IField) {
    super(arg);
    this.type = "phoneNumber";
  }

  validationSchema = () => this.addRequired(
    Yup.string()
      .required('จำเป็นต้องกรอก')
      .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
      .length(10, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก')
  )

  initialValue = () => this.userValue ?? '';

}

export default PhoneNumberFieldViewModel;