import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";
import * as Yup from "yup";

class PhoneNumberFieldViewModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
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