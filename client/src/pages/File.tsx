import { Flex, Box } from '@chakra-ui/react'
import FileList from '@components/FileList'
import FolderDetail from '@components/FolderDetail'
import FolderUploadedFile from '@models/FolderUploadedFile'
import { addDays, subDays } from 'date-fns'
import markdown from 'src/mockData/markdown'
import UploadFile from '@components/UploadFile'
import TakeNote from '@components/TakeNote'
import { Viewer } from '@react-pdf-viewer/core'

const File = () => {
  let documentView = {
    justifyContent: 'space-evenly',
    height: '768px',
  }

  let abstractArea = {
    position: 'absolute',
    top: '0',
    left: '0',
  }

  return (
    <Flex sx={documentView}>
      <Box sx={abstractArea}>
        <UploadFile />
        <TakeNote />
      </Box>
      <FolderDetail
        title="เอกสารขจัดขนตูด"
        description="เอกสารขจัดขนตูดนี้มีมาก ไม่สิ ต้องพูดว่ามีต่อดากมากกก"
        markdown={markdown}
        status="มีอยู่ในคลัง"
      />

      <Viewer fileUrl="/assets/bro.pdf" />
    </Flex>
  )
}

export default File