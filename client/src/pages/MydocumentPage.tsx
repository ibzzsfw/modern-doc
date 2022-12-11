import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import DocumentBar from '@components/DocumentBar'
import DocumentBlankBox from '@components/DocumentBlankBox'
import DocumentBox from '@components/DocumentBox'
import SearchBox from '@components/SearchBox'
import ShareModal from '@components/ShareModal'
import TakeNote from '@components/TakeNote'
import UploadFile from '@components/UploadFile'
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
    data: latestFiles,
    isLoading: latestFilesLoading,
    error: latestFilesError,
  } = useQuery(['latestFiles', user?.id], async () => {
    return await FileController.getLatestFile('generatedFile')
  })

  console.log(latestFiles)

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

  if (latestFilesLoading || latestFolderLoading || latestNoteLoading)
    return <div>Loading...</div>

  if (latestFilesError || latestFolderError || latestNoteError)
    return <div>Error</div>

  if (latestFiles || latestFolder || latestNote)
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
              customButton={
                <DocumentBlankBox
                  icon={AiFillPlusCircle}
                  size={'80px'}
                  color={'gray.500'}
                />
              }
            />
            {latestNote
              .filter((note) => note.heading.toLowerCase().includes(search))
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
            <ShareModal
              customButton={
                <DocumentBlankBox
                  icon={AiFillPlusCircle}
                  size={'80px'}
                  color={'gray.500'}
                />
              }
            />

            {shareFile
              .filter((file) => file.title.toLowerCase().includes(search))
              .map((file: any) => {
                return (
                  <DocumentBox
                    id={file.id}
                    type={file.type}
                    title={file.title}
                    author={file.author}
                    showNote
                    note={file.note}
                    showMenu={true}
                  />
                )
              })
              .slice(0, 1)}
          </>
        </DocumentBar>
        <DocumentBar
          title="แฟ้มเอกสารของฉัน"
          onAddonButtonClick={() => {
            navigate('/alldocument/folder')
          }}
        >
          {latestFolder
            .filter((folder) =>
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
                />
              )
            })
            .slice(0, 1)}
        </DocumentBar>
        <DocumentBar
          title="ไฟล์ของฉัน"
          onAddonButtonClick={() => {
            navigate('/alldocument/file')
          }}
        >
          {latestFiles
            .filter((file) => file.officialName.toLowerCase().includes(search))
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
                />
              )
            })
            .slice(0, 1)}
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

            {uploadedFile
              .filter((file) => file.title.toLowerCase().includes(search))
              .map((file: any) => {
                return (
                  <DocumentBox
                    id={file.id}
                    type={file.type}
                    title={file.title}
                    image={file.image}
                    amount={file.amount}
                    showNote
                    note={file.note}
                    size={file.size}
                    showMenu={true}
                  />
                )
              })
              .slice(0, 1)}
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
