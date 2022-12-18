import FieldViewModel from "@view-models/Field.viewmodel";
import IField from "@interfaces/Field";
import * as Yup from "yup";

class DateFieldViewModel extends FieldViewModel implements IField {
  constructor(arg: IField) {
    super(arg);
    this.type = "date";
  }

  validationSchema = () => this.addRequired(Yup.date().required('จำเป็นต้องกรอกวันที่'))

  initialValue = () => this.userValue ?? new Date();

}

export default DateFieldViewModel;