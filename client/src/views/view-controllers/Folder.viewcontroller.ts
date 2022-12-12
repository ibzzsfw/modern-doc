import { FormPageModel } from "@models/FormPageStore.model"
import { useState } from "react"
import { useParams } from "react-router-dom"

class FolderViewController {
  param = useParams<{ id: string }>()
  formPageStore = FormPageModel()
  generateFileListState = useState<any[]>([])
  uploadedFileListState = useState<any[]>([])
  filledGeneratedFileState = useState<Uint8Array[]>([])

  constructor() {
    this.generateFileListState = useState<any[]>([])
    this.uploadedFileListState = useState<any[]>([])
    this.filledGeneratedFileState = useState<Uint8Array[]>([])
  }
}

export default FolderViewController