import { Flex, Box } from '@chakra-ui/react'
import FileList from '@components/FileList'
import DocumentDetail from '@components/DocumentDetail'
import FolderUploadedFile from '@models/FolderUploadedFile'
import { addDays, subDays } from 'date-fns'
import markdown from 'src/mockData/markdown'
import UploadFile from '@components/UploadFile'

import FileViewer from '@components/FileViewer'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import FileController from '@models/FileController'
import { useFilePageStore } from '@stores/FilePageStore'
import { useFormPageStore } from '@stores/FormPageStore'
import shallow from 'zustand/shallow'
import { useEffect, useState } from 'react'
import axios from 'axios'
import BlankPdf from '../../public/assets/blank.pdf'
import Field from '@models/Field'
import download from 'downloadjs'
import { PDFDocument } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import FileData from '@models/File'
import TakeNote from '@components/TakeNote'
const File = () => {
  const { id, type } = useParams<{ id: string; type: string }>()
  const [userPdf, setUserPdf] = useState<any>(null)
  const [filePdf, setFilePdf] = useState<any>(null)
  const [previewPdf, setPreviewPdf] = useState<any>(null)

  const { file, setFile, sharedFileType } = useFilePageStore((state) => {
    return {
      file: state.file,
      setFile: state.setFile,
      sharedFileType: state.sharedFileType,
    }
  }, shallow)

  const setDocumentType = useFormPageStore((state) => state.setDocumentType)

  const loadPDFfile = async (URI: string) => {
    const response = await axios.get(URI, {
      responseType: 'blob',
    })
    const file = new Blob([response.data], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file)
    return fileURL
  }

  console.log('file', file)

  useEffect(() => {
    const setPDF = async () => {
      if (userPdf) {
        setFilePdf(userPdf)
      } else if (file.URI) {
        const fileURL = await loadPDFfile(file.URI)
        setFilePdf(fileURL)
      } else if (file.previewURI) {
        const fileURL = await loadPDFfile(file.previewURI)
        setFilePdf(fileURL)
      } else {
        setFilePdf(BlankPdf)
      }
    }
    setPDF()
  }, [file, userPdf])

  const fillForm = async (fields: Field[], file: FileData) => {
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

    setUserPdf(pdfBytes)
  }

  const { data, isLoading, error } = useQuery(
    ['getFileById', id, type],
    async () => {
      if (id !== undefined && type === '3') {
        console.log('sharedFileType', sharedFileType)
        const fileType = sharedFileType === 'uploadedFile' ? '2' : '4'
        return await FileController.getFileById(id, fileType, true)
      }
      if (id !== undefined && type !== undefined) {
        return await FileController.getFileById(id, type)
      }
    },
    {
      onSuccess(data) {
        fillForm(data.fields, data)
      },
    }
  )

  if (data) {
    setFile(data)
    setDocumentType('file')
    console.log(data)
  }

  if (data)
    return (
      <Flex sx={documentView}>
        <Box sx={abstractArea}>{/* <UploadFile /> */}</Box>
        <DocumentDetail
          title={file.officialName}
          description={file?.note}
          markdown={file.description}
          status={file.date ? 'มีอยู่ในคลัง' : 'ไม่มีอยู่ในคลัง'}
          type={file.type}
        />
        <FileViewer fileUrl={filePdf ? filePdf : BlankPdf} />
      </Flex>
    )
  else return <div>loading</div>
}

let documentView = {
  justifyContent: 'space-evenly',
  height: '768px',
}

let abstractArea = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '1rem',
  position: 'absolute',
  top: '0',
  right: '2rem',
}

export default File
