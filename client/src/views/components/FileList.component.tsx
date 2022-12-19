import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Icon,
  IconButton,
  Spacer,
  useDisclosure
} from '@chakra-ui/react'
import DocumentBadge from '@components/DocumentBadge.component'
import ImportFromFamily from '@components/ImportFromFamily.component'
import MenuProvider from '@components/MenuProvider.component'
import UploadFile from '@components/UploadFile.component'
import FormPageModel from '@models/FormPage.model'
import fontkit from '@pdf-lib/fontkit'
import FieldViewModel from '@view-models/Field.viewmodel'
import FileController from '@view-models/FileController'
import FileViewModel from '@view-models/Files.viewmodel'
import GenerateFileViewModel from '@view-models/GenerateFiles.viewmodel'
import UploadFileViewModel from '@view-models/UploadFile.viewmodel'
import { PDFDocument } from 'pdf-lib'
import PDFMerger from 'pdf-merger-js'
import { useEffect, useState } from 'react'
import {
  AiFillClockCircle,
  AiFillTag,
  AiOutlineDownload,
  AiOutlinePlus,
  AiOutlineUpload
} from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { GrUpload } from 'react-icons/gr'
import { HiArrowDownRight } from 'react-icons/hi2'
import { RiFileSearchLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

type fileDetails = {
  file: UploadFileViewModel | GenerateFileViewModel;
  amount: number;
  remark: string;
}

type propsType = {
  files: fileDetails[]
}

const FileList = ({ files }: propsType) => {
  const navigate = useNavigate()
  const {
    document,
    setSelectedFile,
    selectedFile,
    setDocumentType,
    generatedFile,
    setGeneratedFile,
  } = FormPageModel()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<FileViewModel | null>(null)
  const [fileMenu, setFileMenu] = useState<FileViewModel | null>(null)
  const {
    isOpen: isOpenImport,
    onOpen: onOpenImport,
    onClose: onCloseImport,
  } = useDisclosure()

  const onChangeCheckbox = (checked: boolean, file: FileViewModel) => {
    if (checked) {
      setSelectedFile([...selectedFile, file])
    } else {
      setSelectedFile(selectedFile.filter((f) => f.id !== file.id))
    }
  }

  const onChangeAllCheckbox = (checked: boolean) => {
    if (checked) {
      setSelectedFile(files.map((f) => f.file))
    } else {
      setSelectedFile([])
    }
  }

  const isSelectedThisFile = (file: GenerateFileViewModel | UploadFileViewModel) => {
    return selectedFile.filter((f) => f.id === file.id).length > 0
  }

  const fillFormFolder = async () => {
    const pdfList: any[] = []
    let promise = generatedFile.map(async (file) => {
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

      file.fields.map((field: FieldViewModel) => {
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
      pdfList.push(pdfBytes)
    })

    await Promise.all(promise)
    const merger = new PDFMerger()

    let pdfListPromise = pdfList.map(async (pdf) => {
      await merger.add(pdf)
    })

    let uploadedListPromise = selectedFile.map(async (file) => {
      if (file.type == 'uploadedFile') {
        const formUrl = file?.URI ? file.URI : ''
        const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer())
        await merger.add(formBytes)
      }
    })
    await Promise.all(pdfListPromise)
    await Promise.all(uploadedListPromise)

    await merger.save(`${document?.officialName}`)

  }

  useEffect(() => {
    setDocumentType('folder')
    const getGeneratedFileField = async () => {
      const promise = selectedFile
        .filter((file) => file.type == 'generatedFile')
        .map(async (file) => {
          const result = await FileController.getFileById(file.id, '1')
          return result
        })
      const result = await Promise.all(promise)
      setGeneratedFile(result)
    }
    getGeneratedFileField()

  }, [selectedFile])

  const menuOption = [
    [
      {
        title: 'สร้างเอกสาร',
        icon: <Icon as={AiOutlinePlus} />,
        onClick: () => {
          navigate(`/file/1/${fileMenu?.id}`)
        },
      },
      {
        title: 'อัพโหลดไฟล์ใหม่',
        icon: <Icon as={GrUpload} />,
        onClick: () => {
          //---------function upload file if you want you can delete this because have button upload file
          setOpen(true)
          setFile(fileMenu)
        },
      },
    ],
    [
      {
        title: 'ดูตัวอย่าง',
        icon: <Icon as={RiFileSearchLine} />,
        onClick: () => {
          if (fileMenu instanceof GenerateFileViewModel)
            navigate(`/file/1/${fileMenu?.id}`)
          else navigate(`/file/2/${fileMenu?.id}`)
        },
      },
      {
        title: 'นำเข้าจากสมาชิก',
        icon: <Icon as={HiArrowDownRight} />,
        onClick: () => {
          //-------- function import from member
          onOpenImport()
        },
      },
    ],
  ]


  return (
    <>
      <Flex sx={fileList}>
        <Box sx={tableBody}>
          <Grid templateColumns="1fr 3fr 2fr 2fr 1fr 1fr" sx={tableHead}>
            <Box sx={simpleBox}>
              <Checkbox
                isChecked={selectedFile.length === files.length}
                onChange={(e) => onChangeAllCheckbox(e.target.checked)}
              />
            </Box>
            <Box sx={simpleBox}>
              <AiFillTag />
              ชื่อเอกสาร
            </Box>
            <Box sx={simpleBox}>จำนวน</Box>
            <Box sx={simpleBox}>
              <AiFillClockCircle />
              สถานะ
            </Box>
            <Box sx={simpleBox}>หมายเหตุ</Box>
          </Grid>
          <Divider />
          <Box sx={tableContent}>
            {files.map((f) => {
              let {file, remark, amount} = f
              file = file.type == 'generatedFile'
              ? new GenerateFileViewModel(file)
              : new UploadFileViewModel(file)
              console.log(file)
              return (
                <>
                  <Grid
                    templateColumns="1fr 3fr 2fr 2fr 1fr 1fr"
                    sx={isSelectedThisFile(file) ? tableRowSelected : tableRow}
                    key={file.id}
                  >
                    <Box sx={simpleBox}>
                      {file.type == 'generatedFile' ||
                        (file.type == 'uploadedFile' &&
                          file.getStatus() != 'ไม่มีอยู่ในคลัง') ? (
                        <Checkbox
                          isChecked={isSelectedThisFile(file)}
                          onChange={(e) =>
                            onChangeCheckbox(e.target.checked, file)
                          }
                        />
                      ) : (
                        <IconButton
                          aria-label="Search database"
                          icon={<AiOutlineUpload />}
                          size="sm"
                          variant="outline"
                          colorScheme={'gray'}
                          onClick={() => {
                            setOpen(true)
                            setFile(file)
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={simpleBox}>{file.officialName}</Box>
                    <Box sx={simpleBox}>{amount}</Box>
                    <Box sx={simpleBox}>
                      <DocumentBadge status={file.getStatus()} />
                    </Box>
                    <Box sx={{ ...simpleBox, fontSize: '14px' }}>
                      {remark}
                    </Box>
                    <Box sx={simpleBox}>
                      <Box
                        position="absolute"
                        onClick={() => setFileMenu(file)}
                      >
                        <MenuProvider
                          left="0px"
                          top="20px"
                          menusList={[
                            file.type == 'generatedFile'
                              ? [menuOption[0][0], menuOption[1][0]]
                              : [
                                menuOption[0][1],
                                menuOption[1][1],
                                menuOption[1][0],
                              ],
                          ]}
                        >
                          <Icon as={BsThreeDots} sx={threeDot} boxSize="18px" />
                        </MenuProvider>
                      </Box>
                    </Box>
                  </Grid>
                </>
              )
            })}
          </Box>
        </Box>
        <ButtonGroup>
          <Spacer />
          <Button
            colorScheme={'messenger'}
            size="sm"
            rightIcon={<AiOutlineDownload />}
            disabled={selectedFile.length == 0}
            onClick={() => {
              fillFormFolder()
            }}
          >
            ดาวน์โหลดแฟ้ม
          </Button>
        </ButtonGroup>
      </Flex>
      <UploadFile open={open} setOpen={(e) => setOpen(e)} file={file} />
      {console.log(fileMenu)}
      <ImportFromFamily
        isOpen={isOpenImport}
        onClose={onCloseImport}
        onOpen={onOpenImport}
        fileId={fileMenu?.id}
        fileName={fileMenu?.officialName}
      />
    </>
  )
}

let abstractBox = {
  borderRadius: '6px',
  backgroundColor: 'background.white',
  width: 'inherit',
  height: 'fit-content',
}

let fileList = {
  width: '648px',
  flexDirection: 'column',
  rowGap: '1rem',
  position: 'relative',
}

let simpleBox = {
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  columnGap: '4px',
}

let tableBody = {
  ...abstractBox,

  overflow: 'hidden',
  shadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
}

let tableContent = {
  width: 'inherit',

  maxHeight: 'calc(768px - 48px - 80px)',
  overflowY: 'auto',
  overflowX: 'hidden',
}

let tableRow = {
  width: 'inherit',
  height: '48px',
  borderBottom: '1px solid',
  borderColor: 'background.gray',
  transition: 'all 0.1s',
  _hover: {
    backgroundColor: 'gray.100',
  },
}

let tableRowSelected = {
  ...tableRow,
  backgroundColor: 'lightBlue',
  _hover: {
    backgroundColor: 'lightBlue',
  },
}

let tableHead = {
  ...tableRow,
  fontWeight: '500',
  _hover: {
    backgroundColor: 'background.white',
  },
}

let threeDot = {
  top: '-5px',
  right: '-5px',
  position: 'absolute',
  color: 'accent.black',
  _hover: {
    color: 'accent.gray',
  },
}

export default FileList