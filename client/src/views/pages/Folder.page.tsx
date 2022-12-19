import { Flex } from '@chakra-ui/react'
import DocumentDetail from '@components/DocumentDetail.component'
import FileList from '@components/FileList.component'
import FormPageModel from '@models/FormPage.model'
import { useQuery } from '@tanstack/react-query'
import FolderController from '@view-models/FolderController'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const Folder = () => {
  const { id } = useParams<{ id: string }>()
  const {
    setDocument,
  } = FormPageModel()

  const [generateFileList, setGenerateFileList] = useState<any[]>([])
  const [uploadedFileList, setUploadedFileList] = useState<any[]>([])

  const { data: folderData } = useQuery(
    ['getFolderById', id],
    async () => await FolderController.getFolderById(id),
    {
      onSuccess: async (data) => {
        setDocument(data)
        if (data.file) {
          data.file.map((file: any) => {
            if (file.file.type === 'generatedFile') {
              setGenerateFileList([...generateFileList, file])
            } else {
              setUploadedFileList([...uploadedFileList, file])
            }
          })
        }
      },
    }
  )

  if (folderData && generateFileList && uploadedFileList) {
    return (
      <Flex sx={documentView}>
        <DocumentDetail
          title={folderData.officialName ?? 'ไม่มีชื่อแฟ้ม'}
          description={folderData.note ?? 'ไม่มีบันทึก'}
          markdown={folderData.description ?? ''}
          status={folderData.dateUpload ? 'มีอยู่ในคลัง' : 'ไม่มีอยู่ในคลัง'}
          type="folder"
        />
        <FileList files={folderData.file ?? []} />
      </Flex>
    )
  }
  return <></>
}
export default Folder

let documentView = {
  justifyContent: 'space-evenly',
  height: '768px',
}