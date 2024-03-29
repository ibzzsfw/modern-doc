import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import UserModel from '@models/User.model'
import { useQuery } from '@tanstack/react-query'
import FileController from '@view-models/FileController'
import FolderViewModel from '@view-models/Folder.viewmodel'
import FolderController from '@view-models/FolderController'
import GenerateFileViewModel from '@view-models/GenerateFiles.viewmodel'
import NoteController from '@view-models/NoteController'
import UploadFileViewModel from '@view-models/UploadFile.viewmodel'
import { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import DocumentBar from 'src/views/components/DocumentBar.component'
import DocumentBlankBox from 'src/views/components/DocumentBlankBox.component'
import DocumentBox from 'src/views/components/DocumentBox.component'
import SearchBox from 'src/views/components/SearchBox.component'
import TakeNote from 'src/views/components/TakeNote.component'
import UploadFile from 'src/views/components/UploadFile.component'

const MyDocument = () => {

  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { user } = UserModel()

  const {
    data: latestGeneratedFiles,
    isLoading: latestGeneratedFilesLoading,
    error: latestGeneratedFilesError,
  } = useQuery(['generatedFile', user?.id], async () => {
    return await FileController.getLatestFile('generatedFile')
  })

  const {
    data: latestUploadedFiles,
    isLoading: latestUploadedFilesLoading,
    error: latestUploadedFilesError,
  } = useQuery(['uploadedFile', user?.id], async () => {
    return await FileController.getLatestFile('uploadedFile')
  })
  const {
    data: latestSharedFiles,
    isLoading: latestSharedFilesLoading,
    error: latestSharedFilesError,
  } = useQuery(['sharedFile', user?.id], async () => {
    return await FileController.getLatestFile('sharedFile')
  })

  const {
    data: latestFolder,
    isLoading: latestFolderLoading,
    error: latestFolderError,
  } = useQuery(['latestFolder', user?.id], FolderController.getLatestFolder)

  const {
    data: latestNote,
    isLoading: latestNoteLoading,
    error: latestNoteError,
  } = useQuery(['lastestNote', user?.id], NoteController.getLastestNote)

  if (
    latestGeneratedFilesLoading ||
    latestUploadedFilesLoading ||
    latestFolderLoading ||
    latestNoteLoading ||
    latestSharedFilesLoading
  )
    return <div>Loading...</div>

  if (
    latestGeneratedFilesError ||
    latestUploadedFilesError ||
    latestFolderError ||
    latestNoteError ||
    latestSharedFilesError
  )
    return <div>Error</div>

  if (latestGeneratedFiles || latestUploadedFiles || latestFolder || latestNote)
    return (
      <Box sx={layout}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          marginBottom="30px"
        >
          <Flex flexDirection="column" gap="0">
            <Text fontSize="32px" fontWeight="700" color="accent.black">
              เอกสารของฉัน
            </Text>
            <Text fontSize="16px" fontWeight="500" color="accent.lightGray">
              คลังเก็บเอกสารที่สร้างจากเว็บไซต์และเอกสารที่อัปโหลด
            </Text>
          </Flex>
          <SearchBox
            value={search}
            onSearchClick={(params) => setSearch(params)}
          />
        </Flex>
        <DocumentBar
          title="บันทึกเตือนความจำของฉัน"
          onAddonButtonClick={() => {
            navigate('/alldocument/note')
          }}
        >
          <>
            <TakeNote
              userId={user?.id}
              type={'freeNote'}
              customButton={
                <DocumentBlankBox
                  icon={AiFillPlusCircle}
                  size={'80px'}
                  color={'gray.500'}
                />
              }
            />
            {latestNote && latestNote
              .filter((note: any) =>
                note.heading.toLowerCase().includes(search)
              )
              .map((note: any) => {
                return (
                  <DocumentBox
                    id={note.id}
                    type={'note'}
                    title={note.heading}
                    // author={note.author}
                    showNote
                    note={note.content}
                    modifiedDate={new Date(note.modifiedDate)}
                    showMenu={true}
                  />
                )
              })
              .slice(0, 2)}
          </>
        </DocumentBar>
        <Divider size="20px" />
        <DocumentBar
          title="เอกสารที่แชร์ร่วมกัน"
          onAddonButtonClick={() => {
            navigate('/alldocument/sharefile')
          }}
        >
          <>
            {latestSharedFiles && latestSharedFiles
              .filter((file) =>
                file.file.officialName.toLowerCase().includes(search)
              )
              .map((file: any) => {
                let {id, officialName, note, isShared} = file.file
                return (
                  <DocumentBox
                    id={id}
                    type={'sharedFile'}
                    title={officialName}
                    author={file.owner}
                    showNote
                    note={note}
                    showMenu={true}
                    isShared={isShared}
                  />
                )
              })
              .slice(0, 3)}
          </>
        </DocumentBar>
        <DocumentBar
          title="แฟ้มเอกสารของฉัน"
          onAddonButtonClick={() => {
            navigate('/alldocument/folder')
          }}
        >
          {latestFolder && latestFolder
            .filter((folder: FolderViewModel) =>
              folder.officialName?.toLowerCase().includes(search)
            )
            .map((folder: FolderViewModel) => {
              return (
                <DocumentBox
                  id={folder.id ?? ''}
                  title={folder.officialName ?? 'ไม่มีชื่อ'}
                  type="generatedFolder"
                  createdDate={folder.dateUpload}
                  showDate
                  showNote
                  note={folder.note}
                  showMenu={true}
                />
              )
            })
            .slice(0, 3)}
        </DocumentBar>
        <DocumentBar
          title="ไฟล์ของฉัน"
          onAddonButtonClick={() => {
            navigate('/alldocument/generatedFile')
          }}
        >
          {latestGeneratedFiles && latestGeneratedFiles
            .filter((file: GenerateFileViewModel) =>
              file.officialName?.toLowerCase().includes(search)
            )
            .map((file: any) => {
              return (
                <DocumentBox
                  image={file.image}
                  amount={file.amount}
                  showNote
                  size={file.size}
                  showMenu={true}
                  id={file.id}
                  title={file.officialName}
                  type={file.type ?? 'generatedFile'}
                  note={file.note}
                  showDate
                  createdDate={new Date(file.dateUpload)}
                  isShared={file.isShared}
                />
              )
            })
            .slice(0, 3)}
        </DocumentBar>

        <DocumentBar
          title="เอกสารที่อัปโหลด"
          onAddonButtonClick={() => {
            navigate('/alldocument/uploadedfile')
          }}
        >
          <>
            <UploadFile
              customButton={
                <DocumentBlankBox
                  icon={AiFillPlusCircle}
                  size={'80px'}
                  color={'gray.500'}
                />
              }
            />

            {latestUploadedFiles && latestUploadedFiles
              .filter((file: UploadFileViewModel) =>
                file.officialName?.toLowerCase().includes(search)
              )
              .map((file: UploadFileViewModel) => {
                return (
                  <DocumentBox
                    id={file.id ?? ''}
                    type={file.type ?? 'uploadedFile'}
                    title={file.officialName ?? 'ไม่มีชื่อ'}
                    showNote
                    note={file.note}
                    showMenu={true}
                    isShared={file.isShared}
                  />
                )
              })
              .slice(0, 2)}
          </>
        </DocumentBar>
      </Box>
    )
  return <></>
}

export default MyDocument

let layout = {
  backgroundColor: 'background.gray',
  color: 'accent.black',
  width: '100%',
}
