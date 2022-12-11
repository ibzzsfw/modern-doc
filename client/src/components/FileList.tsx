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
  useDisclosure,
} from '@chakra-ui/react'
import MenuProvider from '@components/MenuProvider'
import UploadFile from '@components/UploadFile'
import GeneratedFile from '@models/GeneratedFile'
// import UploadedFile from '@models/UploadedFile'
import { useGeneratedFileStore } from '@stores/GeneratedFile'
import { useFormPageStore } from '@stores/FormPageStore'
import { useEffect, useState } from 'react'
import {
  AiFillClockCircle,
  AiFillTag,
  AiOutlineDownload,
  AiOutlinePlus,
  AiOutlineUpload,
} from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { GrUpload } from 'react-icons/gr'
import { HiArrowDownRight } from 'react-icons/hi2'
import { RiFileSearchLine } from 'react-icons/ri'
import DocumentBadge from '@components/DocumentBadge'
import UploadedFile from '@models/dyl/UploadedFile'
import File from '@models/File'
import FileController from '@models/FileController'
import { useNavigate } from 'react-router-dom'

type propsType = {
  files: any[]
}

const FileList = ({ files }: propsType) => {
  const navigate = useNavigate()
  const {
    setSelectedDocument,
    selectedDocument,
    setDocumentType,
    setGeneratedFiles,
  } = useFormPageStore()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileMenu, setFileMenu] = useState<File | null>(null)

  const onChangeCheckbox = (checked: boolean, file: File) => {
    if (checked) {
      setSelectedDocument([...selectedDocument, file])
    } else {
      setSelectedDocument(selectedDocument.filter((f) => f.id !== file.id))
    }
  }

  const onChangeAllCheckbox = (checked: boolean) => {
    if (checked) {
      setSelectedDocument(files.filter((file) => file.URI != null))
    } else {
      setSelectedDocument([])
    }
  }

  const isSelectedThisFile = (file: GeneratedFile) => {
    return selectedDocument.filter((f) => f.id === file.id).length > 0
  }

  console.log('selected file', selectedDocument)

  useEffect(() => {
    setDocumentType('folder')
    const getGeneratedFileField = async () => {
      const promise = selectedDocument
        .filter((file) => file.type == 'generatedFile')
        .map(async (file) => {
          const result = await FileController.getFileById(file.id, '1')
          return result
        })
      const result = await Promise.all(promise)
      console.log('result', result)
      setGeneratedFiles(result)
    }
    getGeneratedFileField()

    console.table(selectedDocument)
  }, [selectedDocument])

  const countGeneratedFile = () =>
    files.filter((file) => file.type == 'generatedFile').length

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
          if (fileMenu?.type == 'generatedFile')
            navigate(`/file/1/${fileMenu?.id}`)
          else navigate(`/file/2/${fileMenu?.id}`)
        },
      },
      {
        title: 'นำเข้าจากสมาชิก',
        icon: <Icon as={HiArrowDownRight} />,
        onClick: () => {
          //-------- function import from member
        },
      },
    ],
  ]

  console.log('files', files)

  return (
    <>
      <Flex sx={fileList}>
        <Box sx={tableBody}>
          <Grid templateColumns="1fr 3fr 2fr 2fr 1fr 1fr" sx={tableHead}>
            <Box sx={simpleBox}>
              <Checkbox
                isChecked={selectedDocument.length === countGeneratedFile()}
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
            {files.map((file) => {
              file = new UploadedFile(file)
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
                    <Box sx={simpleBox}>{file.amount}</Box>
                    <Box sx={simpleBox}>
                      {/* {'API'} */}
                      <DocumentBadge status={file.getStatus()} />
                    </Box>
                    <Box sx={simpleBox}>{file.remark}</Box>
                    <Box sx={simpleBox}>
                      <Box position="absolute">
                        <MenuProvider
                          left="0px"
                          top="20px"
                          menusList={[
                            file.type == 'generatedFile'
                              ? [menuOption[0][0]]
                              : [menuOption[0][1]],
                            menuOption[1],
                          ]}
                        >
                          <Icon
                            as={BsThreeDots}
                            sx={threeDot}
                            boxSize="18px"
                            onClick={() => setFileMenu(file)}
                          />
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
          >
            ดาวน์โหลดแฟ้ม
          </Button>
        </ButtonGroup>
      </Flex>
      <UploadFile open={open} setOpen={(e) => setOpen(e)} file={file} />
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
