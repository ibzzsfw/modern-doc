import { Box, Flex } from '@chakra-ui/react'
import DocumentDetail from '@components/DocumentDetail.component'
import FileViewer from '@components/FileViewer.component'
import { useQuery } from '@tanstack/react-query'
import FileViewController from '@view-controllers/Files.page.viewcontroller'
import FileController from '@view-models/FileController'
import GenerateFileViewModel from '@view-models/GenerateFiles.viewmodel'
import { useEffect } from 'react'
import BlankPdf from '../../../public/assets/blank.pdf'

const File = () => {

  const viewController = new FileViewController()

  const { id, type } = viewController.param
  const [userPdf, setUserPdf] = viewController.userPdfState
  const [filePdf, setFilePdf] = viewController.filePdfState
  const { file, setFile, sharedFileType } = viewController.filePageModel


  useEffect(() => {
    const setPDF = async () => {
      if (userPdf) {
        setFilePdf(userPdf)
      } else if (file?.URI) {
        const fileURL = await viewController.loadPDFfile(file.URI)
        setFilePdf(fileURL)
      } else if (file?.previewURI) {
        const fileURL = await viewController.loadPDFfile(file.previewURI)
        setFilePdf(fileURL)
      } else {
        setFilePdf(BlankPdf)
      }
    }
    setPDF()
  }, [file, userPdf])

  const { data, isLoading, error } = useQuery(
    ['getFileById', id, type],
    async () => {
      if (id !== undefined && type === '3') {
        const fileType = sharedFileType === 'uploadedFile' ? '2' : '4'
        return await FileController.getFileById(id, fileType, true)
      }
      if (id !== undefined && type !== undefined) {
        return await FileController.getFileById(id, type)
      }
    },
    {
      onSuccess(data) {
        if (data?.type == 'generatedFile') {
          viewController.fillForm(data as GenerateFileViewModel)
        }
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
        <DocumentDetail
          title={file?.officialName ?? 'ไม่มีชื่อเอกสาร'}
          description={file?.note ?? 'ไม่มีรายละเอียดเอกสาร'}
          markdown={file?.description ?? 'ไม่มีรายละเอียดเอกสาร'}
          status={file?.dateUpload ? 'มีอยู่ในคลัง' : 'ไม่มีอยู่ในคลัง'}
          type={file?.type}
        />
        <FileViewer fileUrl={filePdf ? filePdf : BlankPdf} />
      </Flex>
    )
  else return <div>loading</div>
}

let documentView = {
  justifyContent: 'space-evenly',
  height: '768px',
}

export default File