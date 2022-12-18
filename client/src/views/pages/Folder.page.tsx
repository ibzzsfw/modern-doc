import { Flex, Box } from '@chakra-ui/react'
import FileList from '@components/FileList.component'
import DocumentDetail from '@components/DocumentDetail.component'
import { useState } from 'react'
import FolderController from '@view-models/FolderController'
import { useQuery } from '@tanstack/react-query'
import FormPageModel from '@models/FormPage.model'
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
    console.log('folderData', folderData)
    return (
      <Flex sx={documentView}>
        <DocumentDetail
          title={folderData.officialName}
          description={folderData.note}
          markdown={folderData.description}
          status={folderData.dateUpload ? 'มีอยู่ในคลัง' : 'ไม่มีอยู่ในคลัง'}
          type="folder"
        />
        <FileList files={folderData.file?.map(file => file.file)} />
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