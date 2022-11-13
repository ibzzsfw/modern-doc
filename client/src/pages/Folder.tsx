import { Flex, Box } from '@chakra-ui/react'
import FileList from '@components/FileList'
import FolderDetail from '@components/FolderDetail'
import FolderUploadedFile from '@models/FolderUploadedFile'
import { addDays, subDays } from 'date-fns'
import markdown from 'src/mockData/markdown'
import UploadFile from '@components/UploadFile'
import TakeNote from '@components/TakeNote'
import { useParams } from 'react-router-dom'

const Folder = () => {
  const { id } = useParams()
  console.log(id)

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

      <FileList
        files={[
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
        ]}
      />
    </Flex>
  )
}

export default Folder
