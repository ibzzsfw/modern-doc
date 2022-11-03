import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  Grid,
  IconButton,
  Spacer,
} from '@chakra-ui/react'
import {
  AiFillPrinter,
  AiOutlineDownload,
  AiOutlineUpload,
} from 'react-icons/ai'
import FolderUploadedFile from '@models/FolderUploadedFile'
import DocumentBadge from '@components/DocumentBadge'

type propsType = {
  files: FolderUploadedFile[]
}

const FileList = ({ files }: propsType) => {
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
      backgroundColor: 'lightblue',
    },
  }

  return (
    <Flex sx={fileList}>
      <Box sx={tableBody}>
        <Grid templateColumns="1fr 3fr 2fr 2fr 1fr" sx={tableRow}>
          <Box sx={simpleBox}>
            <Checkbox />
          </Box>
          <Box sx={simpleBox}>ชื่อเอกสาร</Box>
          <Box sx={simpleBox}>จำนวน</Box>
          <Box sx={simpleBox}>สถานะ</Box>
        </Grid>
        <Divider />
        <Box sx={tableContent}>
          {files.map((file, index) => (
            <>
              <Grid
                templateColumns="1fr 3fr 2fr 2fr 1fr"
                sx={tableRow}
                key={index}
              >
                <Box sx={simpleBox}>
                  {file.getStatus() !== 'ไม่มีอยู่ในคลัง' ? (
                    <Checkbox />
                  ) : (
                    <IconButton
                      aria-label="Search database"
                      icon={<AiOutlineUpload />}
                      size="sm"
                    />
                  )}
                </Box>
                <Box sx={simpleBox}>{file.name}</Box>
                <Box sx={simpleBox}>{file.amount}</Box>
                <Box sx={simpleBox}>
                  <DocumentBadge status={file.getStatus()} />
                </Box>
                <Box sx={simpleBox}>...</Box>
              </Grid>
            </>
          ))}
        </Box>
      </Box>
      <ButtonGroup color="accent.white">
        <Spacer />
        <Button
          backgroundColor="accent.blue"
          size="sm"
          rightIcon={<AiOutlineDownload />}
        >
          ดาวน์โหลดแฟ้ม
        </Button>
        <Button
          backgroundColor="accent.black"
          size="sm"
          rightIcon={<AiFillPrinter />}
        >
          พิมพ์แฟ้ม
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

export default FileList
