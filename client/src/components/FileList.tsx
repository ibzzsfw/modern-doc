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
  AiOutlineDownload,
  AiOutlineUpload,
} from 'react-icons/ai'
import FolderUploadedFile from '@models/FolderUploadedFile'
import DocumentBadge from '@components/DocumentBadge'
import GeneratedFile from '@models/GeneratedFile'
import UploadedFile from '@models/UploadedFile'
import { useGeneratedFileStore } from '@stores/GeneratedFile'
import { useState, useEffect } from 'react'
import UploadFile from '@components/UploadFile'

type propsType = {
  files: any[]
}

const FileList = ({ files }: propsType) => {

  const { generatedFile, setGeneratedFile } = useGeneratedFileStore()
  const [checkCount, setCheckCount] = useState(0)
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

  useEffect(() => setCheckCount(generatedFile.length), [generatedFile])

  useEffect(() => console.table(generatedFile), [generatedFile])

  const countGeneratedFile = () => files.filter((file) => file instanceof GeneratedFile).length

  return (<>
    <Flex sx={fileList}>
      <Box sx={tableBody}>
        <Grid templateColumns="1fr 3fr 2fr 2fr 1fr 1fr" sx={tableRow}>
          <Box sx={simpleBox}>
            <Checkbox
              checked={generatedFile.length == countGeneratedFile()}
              onChange={(e) => onChangeAllCheckbox(e.target.checked)}
            />
          </Box>
          <Box sx={simpleBox}>ชื่อเอกสาร</Box>
          <Box sx={simpleBox}>จำนวน</Box>
          <Box sx={simpleBox}>สถานะ</Box>
          <Box sx={simpleBox}>หมายเหตุ</Box>
        </Grid>
        <Divider />
        <Box sx={tableContent}>
          {files.map((file) => (
            <>
              <Grid
                templateColumns="1fr 3fr 2fr 2fr 1fr 1fr"
                sx={tableRow}
                key={file.id}
              >
                <Box sx={simpleBox}>
                  {
                    (file instanceof GeneratedFile) ?
                      <Checkbox
                        checked={isSelectedThisFile(file)}
                        onChange={(e) => onChangeCheckbox(e.target.checked, file)}
                      /> :
                      <IconButton
                        aria-label="Search database"
                        icon={<AiOutlineUpload />}
                        size="sm"
                        onClick={() => {
                          setOpen(true)
                          setFile(file)
                        }}
                      />
                  }
                </Box>
                <Box sx={simpleBox}>{file.officialName}</Box>
                <Box sx={simpleBox}>{'API'}</Box>
                <Box sx={simpleBox}>
                  {'API'}
                  {/* <DocumentBadge status={file.getStatus()} /> */}
                </Box>
                <Box sx={simpleBox}>{'API'}</Box>
                <Box sx={simpleBox}>...</Box>
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
    <UploadFile open={open} setOpen={e => setOpen(e)} file={file} />
  </>)
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

export default FileList
