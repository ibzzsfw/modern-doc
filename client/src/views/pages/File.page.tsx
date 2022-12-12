import { Flex, Box } from '@chakra-ui/react'
import DocumentDetail from 'src/views/components/DocumentDetail.component'
import FileViewer from 'src/views/components/FileViewer.component'
import { useQuery } from '@tanstack/react-query'
import FileController from 'src/view-models/FileController'
import BlankPdf from '../../../public/assets/blank.pdf'
import FileViewController from '../view-controllers/Files.viewcontroller'

const File = () => {

  const viewController = new FileViewController()
  const { id, type } = viewController.param
  const { file, setFile } = viewController.filePageStore
  const [userPdf, setUserPdf] = viewController.userPdfState

  const { data, isLoading, error } = useQuery(
    ['getFileById', id, type],
    async () => {
      if (id !== undefined && type !== undefined) {
        return await FileController.getFileById(id, type)
      }
    },
    {
      onSuccess(data) {
        viewController.fillForm(data.fields, data)
      },
    }
  )

  if (data) {
    setFile(data)
    viewController.setDocumentType('file')
  }

  if (data)
    return (
      <Flex sx={documentView}>
        <Box sx={abstractArea}>{/* <UploadFile /> */}</Box>
        <DocumentDetail
          title={file.officialName}
          description={file?.note}
          markdown={file.description}
          status={file.date ? 'มีอยู่ในคลัง' : 'ไม่มีอยู่ในคลัง'}
          type={file.type}
        />
        {file.URI ? (
          <FileViewer fileUrl={userPdf ? userPdf : file.URI} />
        ) : (
          <FileViewer fileUrl={file.previewURI ?? BlankPdf} />
        )}
      </Flex>
    )
  else return <div>loading</div>
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
