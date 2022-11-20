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
} from '@chakra-ui/react'
import MenuProvider from '@components/MenuProvider'
import UploadFile from '@components/UploadFile'
import GeneratedFile from '@models/GeneratedFile'
import UploadedFile from '@models/UploadedFile'
import { useGeneratedFileStore } from '@stores/GeneratedFile'
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

type propsType = {
  files: any[]
}

const FileList = ({ files }: propsType) => {
  const { generatedFile, setGeneratedFile } = useGeneratedFileStore()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<UploadedFile | null>(null)

  const onChangeCheckbox = (checked: boolean, file: GeneratedFile) => {
    if (checked) {
      setGeneratedFile([...generatedFile, file])
    } else {
      setGeneratedFile(generatedFile.filter((f) => f.id !== file.id))
    }
  }

  const onChangeAllCheckbox = (checked: boolean) => {
    if (checked) {
      setGeneratedFile(files.filter((file) => file instanceof GeneratedFile))
    } else {
      setGeneratedFile([])
    }
  }

  const isSelectedThisFile = (file: GeneratedFile) => {
    return generatedFile.filter((f) => f.id === file.id).length > 0
  }

  useEffect(() => console.table(generatedFile), [generatedFile])

  const countGeneratedFile = () =>
    files.filter((file) => file instanceof GeneratedFile).length

  const menuOptionFix = [
    {
      title: 'ดูตัวอย่าง',
      icon: <Icon as={RiFileSearchLine} />,
      onClick: () => {
        ///----------function see example
      },
    },
    {
      title: 'นำเข้าจากสมาชิก',
      icon: <Icon as={HiArrowDownRight} />,
      onClick: () => {
        //-------- function import from member
      },
    },
  ]

  const menuGenerateFile = (
    <MenuProvider
      left="690px"
      top="36px"
      menusList={[
        [
          {
            title: 'สร้างเอกสาร',
            icon: <Icon as={AiOutlinePlus} />,
            onClick: () => {
              //---------function generate file
            },
          },
        ],
        menuOptionFix,
      ]}
    >
      <Icon as={BsThreeDots} sx={threeDot} boxSize="18px" />
    </MenuProvider>
  )

  const menuUploadFile = (
    <MenuProvider
      left="690px"
      top="36px"
      menusList={[
        [
          {
            title: 'อัพโหลดไฟล์ใหม่',
            icon: <Icon as={GrUpload} />,
            onClick: () => {
              //---------function upload file if you want you can delete this because have button upload file
              setOpen(true)
              setFile(file)
            },
          },
        ],
        menuOptionFix,
      ]}
    >
      <Icon as={BsThreeDots} sx={threeDot} boxSize="18px" />
    </MenuProvider>
  )

  return (
    <>
      <Flex sx={fileList}>
        <Box sx={tableBody}>
          <Grid templateColumns="1fr 3fr 2fr 2fr 1fr 1fr" sx={tableHead}>
            <Box sx={simpleBox}>
              <Checkbox
                isChecked={generatedFile.length === countGeneratedFile()}
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
            {files.map((file) => (
              <>
                <Grid
                  templateColumns="1fr 3fr 2fr 2fr 1fr 1fr"
                  sx={isSelectedThisFile(file) ? tableRowSelected : tableRow}
                  key={file.id}
                >
                  <Box sx={simpleBox}>
                    {file instanceof GeneratedFile ? (
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
                  <Box sx={simpleBox}>{'API'}</Box>
                  <Box sx={simpleBox}>
                    {'API'}
                    {/* <DocumentBadge status={file.getStatus()} /> */}
                  </Box>
                  <Box sx={simpleBox}>{'API'}</Box>
                  <Box sx={simpleBox}>
                    {file instanceof GeneratedFile
                      ? menuGenerateFile
                      : menuUploadFile}
                  </Box>
                </Grid>
              </>
            ))}
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
  top: '10px',
  right: '20px',
  color: 'accent.black',
}

export default FileList
