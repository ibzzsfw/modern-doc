import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import DocumentBar from '@components/DocumentBar'
import DocumentBlankBox from '@components/DocumentBlankBox'
import DocumentBox from '@components/DocumentBox'
import SearchBox from '@components/SearchBox'
import ShareModal from '@components/ShareModal'
import TakeNote from '@components/TakeNote'
import UploadFile from '@components/UploadFile'
import File from '@models/File'
import FileController from '@models/FileController'
import FolderController from '@models/FolderController'
import NoteController from '@models/NoteController'
import { useLoginDataStore } from '@stores/LoginDataStore'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const MyDocument = () => {
  //const { search, setSearch } = useSearchBoxStore()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const user = useLoginDataStore.getState().user
  console.log('token', user?.token)
  const [shareFile, setShareFile] = useState([])
  const [myFile, setMyFile] = useState([])
  const [myFolder, setMyFolder] = useState([])
  const [note, setNote] = useState([])
  const [uploadedFile, setUploadedFile] = useState([])
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
            onSearchClick={(params) => {
              console.log('search', params)
              setSearch(params)
            }}
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
            {latestNote
              .filter((note: any) =>
                note.heading.toLowerCase().includes(search)
              )
              .map((note: any) => {
                return (
                  <DocumentBox
                    id={note.id}
                    type={'note'}
                    title={note.heading}
                    author={note.author}
                    showNote
                    note={note.content}
                    modifiedDate={new Date(note.modifiedDate)}
                    showMenu={true}
                  />
                )
              })}
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
            {/* <ShareModal
              customButton={
                <DocumentBlankBox
                  icon={AiFillPlusCircle}
                  size={'80px'}
                  color={'gray.500'}
                />
              }
            /> */}

            {latestSharedFiles
              .filter((file: any) =>
                file.officialName.toLowerCase().includes(search)
              )
              .map((file: any) => {
                console.log('mygod', file)
                return (
                  <DocumentBox
                    id={file.id}
                    type={file.type}
                    title={file.officialName}
                    author={file.firstName + ' ' + file.lastName}
                    showNote
                    note={file.note}
                    showMenu={true}
                    isShared={file.isShared}
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
          {latestFolder
            .filter((folder: any) =>
              folder.officialName.toLowerCase().includes(search)
            )
            .map((folder: any) => {
              return (
                <DocumentBox
                  id={folder.id}
                  title={folder.officialName}
                  type="generatedFolder"
                  createdDate={folder.date}
                  showDate
                  image={folder.image}
                  amount={folder.amount}
                  showNote
                  note={folder.note}
                  showMenu={true}
                  isShared={folder.isShared}
                />
              )
            })
            .slice(0, 3)}
        </DocumentBar>
        <DocumentBar
          title="ไฟล์ของฉัน"
          onAddonButtonClick={() => {
            navigate('/alldocument/file')
          }}
        >
          {latestGeneratedFiles
            .filter((file: File) =>
              file.officialName.toLowerCase().includes(search)
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
                  createdDate={new Date(file.date)}
                  isShared={file.isShared}
                />
              )
            })
            .slice(0, 3)}
        </DocumentBar>
        <DocumentBar
          title="เอกสารที่อัปโหลด"
          onAddonButtonClick={() => {
            navigate('/alldocument/uploadfile')
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

            {latestUploadedFiles
              .filter((file: File) =>
                file.officialName.toLowerCase().includes(search)
              )
              .map((file: any) => {
                console.log('here', file)
                return (
                  <DocumentBox
                    id={file.id}
                    type={file.type}
                    title={file.officialName}
                    image={file.image}
                    amount={file.amount}
                    showNote
                    note={file.note}
                    size={file.size}
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
}

export default MyDocument

let layout = {
  backgroundColor: 'background.gray',
  color: 'accent.black',
  width: '100%',
}
