import { Flex, Box } from '@chakra-ui/react'
import FileList from '@components/FileList'
import FolderDetail from '@components/FolderDetail'
import FolderUploadedFile from '@models/FolderUploadedFile'
import GeneratedFile from '@models/GeneratedFile'
import UploadedFile from '@models/UploadedFile'
import Field from '@models/Field'
import markdown from 'src/mockData/markdown'
import UploadFile from '@components/UploadFile'
import TakeNote from '@components/TakeNote'
import { useParams } from 'react-router-dom'
import FileViewerDrawer from '@components/FileViewerDrawer'

const Folder = ({/*folder */ }) => {

  return (
    <Flex sx={documentView}>
      <Box sx={abstractArea}>
        {/* <UploadFile /> */}
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
