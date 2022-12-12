import { useDisclosure } from "@chakra-ui/react";
import { FormPageModel } from "@models/FormPageStore.model";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fields from '@view-models/Field'
import * as Yup from 'yup'

class FormPageController {

  formPageStore = FormPageModel()
  disclosure = useDisclosure()
  navigate = useNavigate()
  formValuesState = useState<any>({})
  mergedFieldState = useState<Fields[]>([])
  requiredCountState = useState<number>(0)
  formRef = useRef<any>(null)

  constructor() {
    this.formValuesState = useState<any>({})
    this.mergedFieldState = useState<Fields[]>([])
    this.requiredCountState = useState<number>(0)
    this.formRef = useRef<any>(null)
  }

  initialValuesExraction = (field: Fields[]) => {

    const initialValues: { [key: string]: any | any[] } = {}

    field.map((field: Fields) => {
      if (field.userValue) {
        initialValues[field.name] = field.userValue
        return
      }
      switch (field.type) {
        case 'number':
          initialValues[field.name] = '0'
          break
        case 'date':
          initialValues[field.name] = new Date()
          break
        case 'multiSelect':
          initialValues[field.name] = []
          break
        default:
          initialValues[field.name] = ''
          break
      }
    })
    return initialValues
  }

  mergeField = (a: Fields[], b: Fields[]): Fields[] => {

    const result: Fields[] = []
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

  addRequired = (field: Fields, YupSchema: any) => {
    if (field.isRequired) return YupSchema.required('จำเป็นต้องกรอก')
    return YupSchema
  }

  validationSchemaExraction = (field: Fields[]) => {
    const validationSchema: { [key: string]: any } = {}

    field.map((field: Fields) => {
      switch (field.type) {
        case 'text':
          validationSchema[field.name] = this.addRequired(field, Yup.string())
          break
        case 'number':
          validationSchema[field.name] = this.addRequired(
            field,
            Yup.string()
              .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
              .required('จำเป็นต้องกรอกตัวเลข')
          )

          break
        case 'date':
          validationSchema[field.name] = this.addRequired(
            field,
            Yup.date().required('จำเป็นต้องกรอกวันที่')
          )
          break
        case 'phoneNumber':
          validationSchema[field.name] = this.addRequired(
            field,
            Yup.string()
              .required('จำเป็นต้องกรอก')
              .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
              .length(10, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก')
          )
          break
        case 'email':
          validationSchema[field.name] = this.addRequired(
            field,
            Yup.string()
              .required('จำเป็นต้องกรอก')
              .matches(
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                'กรุณากรอกอีเมลให้ถูกต้อง'
              )
          )
          break
        case 'singleSelect':
          validationSchema[field.name] = this.addRequired(
            field,
            (validationSchema[field.name] = Yup.string()
              .oneOf(field.fieldChoice.map((choice) => choice.name))
              .required('เลือก 1 ตัวเลือก'))
          )
          break
        case 'multiSelect':
          validationSchema[field.name] = Yup.array().required(
            'เลือกอย่างน้อย 1 ตัวเลือก'
          )
          break
        default:
          break
      }
    })

    return validationSchema
  }
}

export default FormPageController;