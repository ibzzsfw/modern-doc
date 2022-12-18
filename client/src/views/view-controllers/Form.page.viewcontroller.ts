import { useDisclosure } from "@chakra-ui/react";
import FormPageModel from "../../models/FormPage.model"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldViewModel from "../../view-models/Field.viewmodel";

class FormPageController {

  formPageModel = FormPageModel()
  disclosure = useDisclosure()
  navigate = useNavigate()
  formValuesState = useState<any>({})
  mergedFieldState = useState<FieldViewModel[]>([])
  requiredCountState = useState<number>(0)
  formRef = useRef<any>(null)

  constructor() {}

  mergeField = (a: FieldViewModel[], b: FieldViewModel[]): FieldViewModel[] => {

    const result: FieldViewModel[] = []
    for (let i = 0; i < a.length; i++) {
      result.push(a[i])
    }
    for (let i = 0; i < b.length; i++) {
      let isDuplicate = false
      for (let j = 0; j < a.length; j++) {
        if (a[j].name === b[i].name) {
          isDuplicate = true
          break
        }
      }
      if (!isDuplicate) result.push(b[i])
    }
    return result
  }

  validationSchemaExraction = (field: FieldViewModel[]) => {
    const validationSchema: { [key: string]: any } = {}

    field.map((field: FieldViewModel) => {
      if (field.name) {
        validationSchema[field.name] = field.validationSchema()
      }
    })

    return validationSchema
  }

  initialValuesExraction = (field: FieldViewModel[]) => {
    const initialValues: { [key: string]: any } = {}

    field.map((field: FieldViewModel) => {
      if (field.name) {
        initialValues[field.name] = field.initialValue()
      }
    })

    return initialValues
  }
}

export default FormPageController;