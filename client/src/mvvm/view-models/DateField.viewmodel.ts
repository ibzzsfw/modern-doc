import FieldModel from "./Field.viewmodel";
import FieldType from "../types/Field";
import * as Yup from "yup";

class DateFieldViewModel extends FieldModel implements FieldType {
  constructor(arg: FieldType) {
    super(arg);
    this.type = "date";
  }

  validationSchema = () => this.addRequired(Yup.date().required('จำเป็นต้องกรอกวันที่'))

  initialValue = () => this.userValue ?? new Date();

}

export default DateFieldViewModel;