import { Flex, Box } from '@chakra-ui/react'
import FileList from '@components/FileList'
import FolderDetail from '@components/FolderDetail'
import FolderUploadedFile from '@models/FolderUploadedFile'
import { addDays, subDays } from 'date-fns'
import markdown from 'src/mockData/markdown'
import UploadFile from '@components/UploadFile'
import TakeNote from '@components/TakeNote'
import FileViewer from '@components/FileViewer'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import FileController from '@models/FileController'
import { useFilePageStore } from '@stores/FilePageStore'
import shallow from 'zustand/shallow'
import { useEffect } from 'react'
import axios from 'axios'
import BlankPdf from '../../public/assets/blank.pdf'

const File = () => {
  const { id, type } = useParams<{ id: string; type: string }>()

  const { file, setFile } = useFilePageStore((state) => {
    return {
      file: state.file,
      setFile: state.setFile,
    }
  }, shallow)

  const { data, isLoading, error } = useQuery(
    ['getFileById', id, type],
    async () => {
      if (id !== undefined && type !== undefined) {
        return await FileController.getFileById(id, type)
      }
    }
  )

  if (data) {
    setFile(data)
    console.log(data)
  }

  if (data)
    return (
      <Flex sx={documentView}>
        <Box sx={abstractArea}>
          {/* <UploadFile /> */}
          <TakeNote />
        </Box>
        <FolderDetail
          title={file.officialName}
          description={''}
          markdown={file.description}
          status="มีอยู่ในคลัง"
        />
        {file.URI ? (
          <FileViewer fileUrl={file.URI} />
        ) : (
          <FileViewer fileUrl={BlankPdf} />
        )}
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

export default File
