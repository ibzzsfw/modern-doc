import { Flex, Box, Button } from '@chakra-ui/react'
import FileList from '@components/FileList'
import FolderDetail from '@components/DocumentDetail'
import FolderUploadedFile from '@models/FolderUploadedFile'
import GeneratedFile from '@models/GeneratedFile'
import UploadedFile from '@models/UploadedFile'
import Field from '@models/Field'
import markdown from 'src/mockData/markdown'
import UploadFile from '@components/UploadFile'
import TakeNote from '@components/TakeNote'
import FileViewerDrawer from '@components/FileViewerDrawer'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import download from 'downloadjs'
// import { useGeneratedFileStore } from '@stores/GeneratedFile'
import { useState } from 'react'
import FolderController from '@models/FolderController'
import { useQuery } from '@tanstack/react-query'
import { useLoginDataStore } from '@stores/LoginDataStore'
import shallow from 'zustand/shallow'
import User from '@models/User'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Folder = (
  {
    /*folder */
  }
) => {
  const { id } = useParams<{ id: string }>()

  const [generateFileList, setGenerateFileList] = useState<any[]>([])
  const [uploadedFileList, setUploadedFileList] = useState<any[]>([])

  const { data: folderData } = useQuery(
    ['getFolderById', id],
    async () => await FolderController.getFolderById(id),
    {
      onSuccess: async (data) => {
        let generateFile: any[] = []
        let uploadedFile: any[] = []
        data.generateFile.map((file: any) => generateFile.push(file))
        data.uploadedFile.map((file: any) => uploadedFile.push(file))

        setGenerateFileList(generateFile)
        setUploadedFileList(uploadedFile)
      },
    }
  )

  let documentView = {
    justifyContent: 'space-evenly',
    height: '768px',
  }

  let abstractArea = {
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    position: 'absolute',
    top: '0',
    right: '2rem',
  }

  // const { filledGeneratedFile, setFilledGeneratedFile } = useGeneratedFileStore()
  const [filledGeneratedFile, setFilledGeneratedFile] = useState<Uint8Array[]>(
    []
  )

  // const fileSet: object[] = [
  //   {
  //     fileUrl: '/assets/generatedFile1.pdf',
  //     field: [
  //       new Field('f1', 'tf', 'textField', 'text'),
  //       new Field('f2', 'nf', 'numberField', 'number'),
  //       new Field('f3', 'df', 'dateField', 'date'),
  //     ],
  //   },
  //   {
  //     fileUrl: '/assets/generatedFile2.pdf',
  //     field: [
  //       new Field('f4', 'sf', 'singleSelectField', 'singleSelect'),
  //       new Field('f5', 'mf', 'multiSelectField', 'multiSelect'),
  //       new Field('f6', 'ef', 'emailField', 'email'),
  //       new Field('f7', 'pf', 'phoneField', 'phone'),
  //     ],
  //   },
  // ]

  // const fillForm = async (schema: object) => {
  //   console.log('fillForm', schema)

  //   const formUrl: string = schema.fileUrl
  //   // Fetch the PDF with form fields
  //   const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer())

  //   // Fetch the Sarabun font
  //   const fontUrl = '/assets/THSarabunNew.ttf'
  //   const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer())

  //   // Load the PDF with form fields
  //   const pdfDoc = await PDFDocument.load(formBytes)

  //   // Embed the font
  //   pdfDoc.registerFontkit(fontkit)
  //   const sarabunFont = await pdfDoc.embedFont(fontBytes)

  //   const form = pdfDoc.getForm()

  //   schema.field.map((field: Field) => {
  //     if (form.getFieldMaybe(field.name)) {
  //       switch (field.type) {
  //         case 'text':
  //           form.getTextField(field.name).setText('Suppakorn')
  //           break
  //         case 'number':
  //           form.getTextField(field.name).setText('123')
  //           break
  //         case 'date':
  //           form.getTextField(field.name).setText('2021-01-01')
  //           break
  //         case 'singleSelect':
  //           form
  //             .getRadioGroup(field.name)
  //             .select(formUrl == '/assets/generatedFile2.pdf' ? '3' : '0')
  //           break
  //         case 'multiSelect':
  //           form.getCheckBox('option1').check()
  //           break
  //         default:
  //           form
  //             .getTextField(field.name)
  //             .setText('ภาษาไทย ' + field.officialName)
  //           break
  //       }
  //     }
  //   })

  //   // **Key Step:** Update the field appearances with the font
  //   form.updateFieldAppearances(sarabunFont)

  //   // Make pdf file simple for user digital read
  //   form.flatten()

  //   const pdfBytes = await pdfDoc.save()
  //   // await download(pdfBytes, "pdf-test.pdf", "application/pdf");
  //   setFilledGeneratedFile([...filledGeneratedFile, pdfBytes])

  //   // console.log({
  //   //   fields: fields,
  //   //   form: formUrl,
  //   //   pdfBytes: pdfBytes
  //   // })
  // }

  const testFillMultiForm = () => {
    setFilledGeneratedFile([])
    // fileSet.map((schema) => {
    //   fillForm(schema)
    // })
    // filledGeneratedFile.map((file, index) => {
    //   download(file, `pdf-test-${index}.pdf`, 'application/pdf')
    // })
  }

  let adam = new User({
    id: '1',
    householdId: '1',
    title: 'นาย',
    firstName: 'นาย',
    lastName: 'นาย',
    citizenId: 'นาย',
    phoneNumber: 'นาย',
    sex: 'ชาย',
    token: 'นาย',
    relationship: 'นาย',
    profileURI: 'นาย',
  })
  console.log('adam', adam, adam instanceof User)
  console.log('fileList', generateFileList, uploadedFileList)

  if (folderData && generateFileList && uploadedFileList) {
    return (
      <Flex sx={documentView}>
        <Box sx={abstractArea}>
          {/* <UploadFile /> */}
          {/* <Button variant={'outline'} onClick={() => testFillMultiForm()}>
            Fill Form
          </Button>
          <TakeNote /> */}
          {/* <FileViewerDrawer files={mockFile} /> */}
        </Box>
        <FolderDetail
          title={folderData.officialName}
          description={folderData.note}
          markdown={folderData.description}
          status="มีอยู่ในคลัง"
        />
        <FileList files={folderData.file} />
      </Flex>
    )
  }
}
export default Folder
