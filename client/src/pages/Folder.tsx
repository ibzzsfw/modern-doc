import { Flex, Box } from '@chakra-ui/react'
import FileList from '@components/FileList'
import FolderDetail from '@components/FolderDetail'
import FolderUploadedFile from '@models/FolderUploadedFile'
import { addDays, subDays } from 'date-fns'
import markdown from 'src/mockData/markdown'
import UploadFile from '@components/UploadFile'
import TakeNote from '@components/TakeNote'
import { useParams } from 'react-router-dom'
import FileViewerDrawer from '@components/FileViewerDrawer'

const Folder = ({/*folder */ }) => {

  return (
    <Flex sx={documentView}>
      <Box sx={abstractArea}>
        <UploadFile />
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
  new FolderUploadedFile(
    '12',
    'เอกสารขจัดขนตูด',
    new Date(),
    new Date()
  ),
  new FolderUploadedFile(
    '13',
    'เอกสารขจัดขนตูด2',
    subDays(new Date(), 3),
    addDays(new Date(), 3),
    '',
    '',
    3,
    ''
  ),
  new FolderUploadedFile(
    '14',
    'เอกสารขจัดขนตูด3',
    subDays(new Date(), 100),
    addDays(new Date(), 100),
    '',
    '',
    2,
    ''
  ),
  new FolderUploadedFile(
    '13',
    'เอกสารขจัดขนตูด4',
    subDays(new Date(), 3),
    addDays(new Date(), 3),
    '',
    '',
    1,
    null
  ),
]

export default Folder
