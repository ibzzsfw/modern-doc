import { Flex, Box, Button } from '@chakra-ui/react'
import FileList from '@components/FileList'
import FolderDetail from '@components/FolderDetail'
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

const Folder = ({/*folder */ }) => {

  const fieldSet: Field[] = [
    // new Field('f1', 'tf', 'textField', 'text'),
    // new Field('f2', 'nf', 'numberField', 'number'),
    new Field('f3', 'df', 'dateField', 'date'),
    new Field('f4', 'sf', 'singleSelectField', 'singleSelect'),
    new Field('f5', 'mf', 'multiSelectField', 'multiSelect'),
    new Field('f6', 'ef', 'emailField', 'email'),
    new Field('f7', 'pf', 'phoneField', 'phone'),
  ]

  const fillForm = async (fields: Field[]) => {

    const formUrl = '/assets/generatedFile2.pdf'
    // Fetch the PDF with form fields
    const formBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    // Fetch the Sarabun font
    const fontUrl = '/assets/THSarabunNew.ttf'
    const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer())

    // Load the PDF with form fields
    const pdfDoc = await PDFDocument.load(formBytes)

    // Embed the font
    pdfDoc.registerFontkit(fontkit);
    const sarabunFont = await pdfDoc.embedFont(fontBytes)

    const form = pdfDoc.getForm()

    fields.map((field) => {
      switch (field.type) {
        case 'text':
          form.getTextField(field.name).setText('Suppakorn')
          // form.setFont(customFont)
          break;
        case 'number':
          form.getTextField(field.name).setText('123')
          break;
        case 'date':
          form.getTextField(field.name).setText('2021-01-01')
          break;
        case 'singleSelect':
          form.getRadioGroup(field.name).select('3');
          break;
        case 'multiSelect':
          form.getCheckBox('option1').check();
          break;
        default:
          form.getTextField(field.name).setText('ภาษาไทย' + field.officialName)
          break;
      }
    })

    
    // **Key Step:** Update the field appearances with the font
    form.updateFieldAppearances(sarabunFont)

    // Make pdf file simple for user digital read
    form.flatten()

    const pdfBytes = await pdfDoc.save()
    await download(pdfBytes, "pdf-test.pdf", "application/pdf");

    console.log({
      fields: fields,
      form: formUrl,
      pdfBytes: pdfBytes
    })
  }

  return (
    <Flex sx={documentView}>
      <Box sx={abstractArea}>
        {/* <UploadFile /> */}
        <Button variant={'outline'} onClick={() => fillForm(fieldSet)}>Fill Form</Button>
        <TakeNote />
        <FileViewerDrawer files={mockFile} />
      </Box>
      <FolderDetail
        title="เอกสารขจัดขนตูด"
        description="เอกสารขจัดขนตูดนี้มีมาก ไม่สิ ต้องพูดว่ามีต่อดากมากกก"
        markdown={markdown}
        status="มีอยู่ในคลัง"
      />
      <FileList files={mockFile} />
    </Flex>
  )
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

const mockFile = [
  new GeneratedFile(
    'f1',
    new Date(),
    new Date(),
    'gf1',
    30,
    'generatedFile1',
    [
      new Field('f1', 'tf', 'textField', 'text'),
      new Field('f2', 'nf', 'numberField', 'number'),
      new Field('f3', 'df', 'dateField', 'date'),
      new Field('f4', 'sf', 'singleSelectField', 'singleSelect'),
    ]
  ),
  new UploadedFile(
    'f2',
    new Date(),
    new Date(),
    'uf1',
    30,
    'uploadedFile1',
    false
  ),
  new GeneratedFile(
    'f3',
    new Date(),
    new Date(),
    'gf2',
    30,
    'generatedFile2',
    [
      new Field('f3', 'df', 'dateField', 'date'),
      new Field('f4', 'sf', 'singleSelectField', 'singleSelect'),
      new Field('f5', 'mf', 'multiSelectField', 'multiSelect'),
      new Field('f6', 'ef', 'emailField', 'email'),
      new Field('f7', 'pf', 'phoneField', 'phone'),
    ]
  ),
  new UploadedFile(
    'f4',
    new Date(),
    new Date(),
    'uf2',
    30,
    'uploadedFile2',
    false
  ),
]

export default Folder
