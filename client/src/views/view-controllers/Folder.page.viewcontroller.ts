import FormPageModel from "../../mvvm/models/FormPage.model"
import FolderPageModel from '../../mvvm/models/FolderPage.model'
import { useState } from "react"
import { useParams } from "react-router-dom"
import DateFieldViewModel from '../../mvvm/view-models/DateField.viewmodel'
import TextFieldViewModel from '../../mvvm/view-models/TextField.viewmodel'
import NumberFieldViewModel from '../../mvvm/view-models/NumberField.viewmodel'
import EmailFieldViewModel from '../../mvvm/view-models/EmailField.viewmodel'
import PhoneNumberFieldViewModel from '../../mvvm/view-models/PhoneNumberField.viewmodel'
import SingleSelectFieldViewModel from '../../mvvm/view-models/SingleSelectField.viewmodel'
import MultipleSelectFieldViewModel from '../../mvvm/view-models/MultipleSelectField.viewmodel'
import AgeFieldViewModel from '../../mvvm/view-models/AgeField.viewmodel'

class FolderViewController {
  param = useParams<{ id: string }>()
  formPageModel = FormPageModel()
  folderPageModel = FolderPageModel()

  constructor() { }
}

export default FolderViewController