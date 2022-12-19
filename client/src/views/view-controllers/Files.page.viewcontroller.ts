import fontkit from '@pdf-lib/fontkit';
import FieldViewModel from '@view-models/Field.viewmodel';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import { useState } from "react";
import { useParams } from "react-router-dom";
import shallow from "zustand/shallow";
import FilePageModel from "../../models/FilePage.model";
import FormPageModel from "../../models/FormPage.model";
import GenerateFileViewModel from '../../view-models/GenerateFiles.viewmodel';

class FileViewController {

  param = useParams<{ id: string; type: string }>()
  userPdfState: [any, (userPdf: any) => void] = useState<any>(null)
  filePdfState: [any, (filePdf: any) => void] = useState<any>(null)
  filePageModel = FilePageModel((state) => {
    return {
      file: state.file,
      setFile: state.setFile,
      sharedFileType: state.sharedFileType,
    }
  }, shallow)
  setDocumentType = FormPageModel((state) => state.setDocumentType)

  constructor() { }

  loadPDFfile = async (URI: string) => {
    const response = await axios.get(URI, {
      responseType: 'blob',
    })
    const file = new Blob([response.data], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file)
    return fileURL
  }

  fillForm = async (file: GenerateFileViewModel) => {
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

    file.fields?.map((field: FieldViewModel) => {
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
          case 'multipleSelect':
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