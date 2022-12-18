import FormPageModel from "../../models/FormPage.model"
import FolderPageModel from '../../models/FolderPage.model'
import { useState } from "react"
import { useParams } from "react-router-dom"
import DateFieldViewModel from '../../view-models/DateField.viewmodel'
import TextFieldViewModel from '../../view-models/TextField.viewmodel'
import NumberFieldViewModel from '../../view-models/NumberField.viewmodel'
import EmailFieldViewModel from '../../view-models/EmailField.viewmodel'
import PhoneNumberFieldViewModel from '../../view-models/PhoneNumberField.viewmodel'
import SingleSelectFieldViewModel from '../../view-models/SingleSelectField.viewmodel'
import MultipleSelectFieldViewModel from '../../view-models/MultipleSelectField.viewmodel'
import AgeFieldViewModel from '../../view-models/AgeField.viewmodel'

class FolderViewController {
  param = useParams<{ id: string }>()
  formPageModel = FormPageModel()
  folderPageModel = FolderPageModel()

  constructor() { }
}

export default FolderViewController