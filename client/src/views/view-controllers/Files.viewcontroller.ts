import Field from "src/view-models/Field";
import FileData from 'src/view-models/File'
import { useFilePageStore } from "@models/FilePageStore.model";
import { useFormPageStore } from "@models/FormPageStore.model";
import { useState } from "react";
import { useParams } from "react-router-dom";
import shallow from "zustand/shallow";
import { PDFDocument } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'

class FileViewController {

  param = useParams<{ id: string; type: string }>()
  userPdfState: [any, (userPdf: any) => void] = useState<any>(null)
  filePageStore = useFilePageStore((state) => {
    return {
      file: state.file,
      setFile: state.setFile,
    }
  }, shallow)
  setDocumentType = useFormPageStore((state) => state.setDocumentType)

  constructor() {
    this.userPdfState = useState<any>(null)
  }

  fillForm = async (fields: Field[], file: FileData) => {
    const formUrl = file?.URI ? file.URI : ''
    // Fetch the PDF with form fields
    const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer())

    // Fetch the Sarabun font
    const fontUrl = '/assets/THSarabunNew.ttf'
    const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer())

    // Load the PDF with form fields
    const pdfDoc = await PDFDocument.load(formBytes)

    // Embed the font
    pdfDoc.registerFontkit(fontkit)
    const sarabunFont = await pdfDoc.embedFont(fontBytes)

    const form = pdfDoc.getForm()

    fields.map((field: Field) => {
      if (form.getFieldMaybe(field.name)) {
        switch (field.type) {
          case 'text':
            form.getTextField(field.name).setText(field.userValue)
            break
          case 'number':
            form.getTextField(field.name).setText(field.userValue)
            break
          case 'date':
            form.getTextField(field.name).setText(field.userValue)
            break
          case 'singleSelect':
            form.getRadioGroup(field.name).select(field.userValue ?? '')
            break
          case 'multiSelect':
            form.getCheckBox('option1').check()
            break
          default:
            form.getTextField(field.name).setText(field.userValue ?? '')
            break
        }
      }
    })

    form.updateFieldAppearances(sarabunFont)

    form.flatten()

    const pdfBytes = await pdfDoc.save()

    this.userPdfState[1](pdfBytes)
  }


}

export default FileViewController