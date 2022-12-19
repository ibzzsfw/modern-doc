import { useParams } from "react-router-dom"
import FolderPageModel from '../../models/FolderPage.model'
import FormPageModel from "../../models/FormPage.model"

class FolderViewController {
  param = useParams<{ id: string }>()
  formPageModel = FormPageModel()
  folderPageModel = FolderPageModel()

  constructor() { }
}

export default FolderViewController