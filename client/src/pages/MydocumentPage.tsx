import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Input,
  IconButton,
  Icon,
  useDisclosure,
  Divider,
} from '@chakra-ui/react'
import SearchBox from '@components/SearchBox'
import DocumentBox from '@components/DocumentBox'
import DocumentBar from '@components/DocumentBar'
import MenuProvider from '@components/MenuProvider'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { GrDocumentText, GrDownload } from 'react-icons/gr'
import { AiFillPrinter, AiOutlineEdit } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import DocumentBlankBox from '@components/DocumentBlankBox'
import TakeNote from '@components/TakeNote'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BsShareFill } from 'react-icons/bs'
import ShareModal from '@components/ShareModal'
import { useNavigate } from 'react-router-dom'
import UploadFile from '@components/UploadFile'
import { useQuery } from '@tanstack/react-query'
import FileController from '@models/FileController'
import FolderController from '@models/FolderController'
import NoteController from '@models/NoteController'
import { useLoginDataStore } from '@stores/LoginDataStore'

const MyDocument = () => {
  //const { search, setSearch } = useSearchBoxStore()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const user = useLoginDataStore.getState().user
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
  console.log('latestUploadedFiles', latestUploadedFiles)

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

  let menu = (
    <MenuProvider
      left="108px"
      top="36px"
      menusList={[
        [
          {
            title: 'รายละเอียด',
            icon: <Icon as={GrDocumentText} />,
            onClick: () => {},
          },
          {
            title: 'แก้ไขโน้ต',
            icon: <Icon as={AiOutlineEdit} />,
            onClick: () => {},
          },
          {
            title: 'ดาวน์โหลด',
            icon: <Icon as={GrDownload} />,
            onClick: () => {},
          },
          {
            title: 'พิมพ์',
            icon: <Icon as={AiFillPrinter} />,
            onClick: () => {},
          },
        ],
        [
          {
            title: 'ลบแฟ้ม',
            icon: <Icon as={BsTrash} color="accent.red" />,
            onClick: () => {},
            style: {
              color: 'accent.red',
            },
          },
        ],
      ]}
    >
      <Icon as={BsThreeDots} sx={threeDot} boxSize="18px" />
    </MenuProvider>
  )

  if (
    latestGeneratedFilesLoading ||
    latestUploadedFilesLoading ||
    latestFolderLoading ||
    latestNoteLoading
  )
    return <div>Loading...</div>

  if (
    latestGeneratedFilesError ||
    latestUploadedFilesError ||
    latestFolderError ||
    latestNoteError
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
              customButton={
                <DocumentBlankBox
                  icon={AiFillPlusCircle}
                  size={'80px'}
                  color={'gray.500'}
                />
              }
            />
            {latestNote
              // .filter((note) => note.heading.toLowerCase().includes(search))
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
                    menu={menu}
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
              // .filter((file) => file.title.toLowerCase().includes(search))
              .map((file: any) => {
                return (
                  <DocumentBox
                    id={file.id}
                    type={file.type}
                    title={file.title}
                    author={file.author}
                    showNote
                    menu={menu}
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
            // .filter((folder) =>
            //   folder.officialName.toLowerCase().includes(search)
            // )
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
                  menu={menu}
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
          {latestGeneratedFiles
            // .filter((file) => file.officialName.toLowerCase().includes(search))
            .map((file: any) => {
              return (
                <DocumentBox
                  image={file.image}
                  amount={file.amount}
                  showNote
                  size={file.size}
                  menu={menu}
                  id={file.id}
                  title={file.officialName}
                  type={file.type ?? 'generatedFile'}
                  showDate
                  createdDate={new Date(file.date)}
                />
              )
            })
            .slice(0, 2)}
        </DocumentBar>
        <DocumentBar
          title="เอกสารที่อัปโหลด"
          onAddonButtonClick={() => {
            navigate('/alldocument/uploadfile')
          }}
        >
          <>
            {/* <UploadFile
              customButton={
                <DocumentBlankBox
                  icon={AiFillPlusCircle}
                  size={'80px'}
                  color={'gray.500'}
                />
              }
            /> */}

            {latestUploadedFiles
              // .filter((file) => file.title.toLowerCase().includes(search))
              .map((file: any) => {
                return (
                  <DocumentBox
                    id={file.id}
                    type={file.type}
                    title={file.officialName}
                    image={file.image}
                    amount={file.amount}
                    showNote
                    size={file.size}
                    menu={menu}
                  />
                )
              })
              .slice(0, 3)}
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

let threeDot = {
  position: 'absolute',
  top: '10px',
  right: '20px',
  color: 'accent.black',
}
