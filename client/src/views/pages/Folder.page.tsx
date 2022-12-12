import { Flex, Box } from '@chakra-ui/react'
import FileList from 'src/views/components/FileList.component'
import DocumentDetail from 'src/views/components/DocumentDetail.component'
import FolderController from 'src/view-models/FolderController'
import { useQuery } from '@tanstack/react-query'
import FolderViewController from '../view-controllers/Folder.viewcontroller'

const Folder = () => {

  const viewController = new FolderViewController()

  const { id } = viewController.param
  const { setDocument } = viewController.formPageStore
  const [generateFileList, setGenerateFileList] = viewController.generateFileListState
  const [uploadedFileList, setUploadedFileList] = viewController.uploadedFileListState

  const { data: folderData } = useQuery(
    ['getFolderById', id],
    async () => await FolderController.getFolderById(id),
    {
      onSuccess: async (data) => {
        setDocument(data)
        let generateFile: any[] = []
        let uploadedFile: any[] = []
        data.generateFile.map((file: any) => generateFile.push(file))
        data.uploadedFile.map((file: any) => uploadedFile.push(file))

        setGenerateFileList(generateFile)
        setUploadedFileList(uploadedFile)
      },
    }
  )

  const [filledGeneratedFile, setFilledGeneratedFile] = viewController.filledGeneratedFileState

  const testFillMultiForm = () => {
    setFilledGeneratedFile([])
  }

  if (folderData && generateFileList && uploadedFileList) {
    return (
      <Flex sx={documentView}>
        <DocumentDetail
          title={folderData.officialName}
          description={folderData.note}
          markdown={folderData.description}
          status="มีอยู่ในคลัง"
          type="folder"
        />
        <FileList files={folderData.file} />
      </Flex>
    )
  }
  return <></>
}

let documentView = {
  justifyContent: 'space-evenly',
  height: '768px',
}

export default Folder
