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


const MyDocument = () => {
  //const { search, setSearch } = useSearchBoxStore()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  
  const { onToggle } = useDisclosure()
  const [shareFile, setShareFile] = useState([
    {
      id: '6',
      type: 'sharedFile',
      title: 'รักษาดินแดน',
      author: 'Wang Junkai',
    },
    {
      id: '6',
      type: 'sharedFile',
      title: 'พาร์สปอร์ต',
      author: 'Yi yangqianxi',
    },
    { id: '6', type: 'sharedFile', title: 'ทะเบียนบ้าน', author: 'Wang yuan' },
  ])
  const [myFile, setMyFile] = useState([
    {
      id: '6',
      type: 'uploadedFile',
      title: 'รักษาดินแดน',
      amount: 9,
      size: 1.2,
    },
    {
      id: '6',
      type: 'uploadedFile',
      title: 'รักษาดินแดน',
      amount: 9,
      size: 6,
    },
    {
      id: '6',
      type: 'uploadedFile',
      title: 'รักษาดินแดน',
      amount: 9,
      size: 527,
    },
  ])
  const [myFolder, setMyFolder] = useState([
    {
      id: '6',
      type: 'generatedFolder',
      title: 'สมัครงานกับ TechLead',
      amount: 9,
      image:
        'https://cdn.sanity.io/images/xeonec4d/production/fc4aef437fe8753e30757498e7baceb016de4c6c-300x250.png?w=1000',
    },
    {
      id: '6',
      type: 'generatedFolder',
      title: 'รักษาดินแดน',
      amount: 9,
    },
    {
      id: '6',
      type: 'generatedFolder',
      title: 'รักษาดินแดน',
      amount: 9,
    },
  ])

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
  const [note, setNote] = useState([])

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

  return  (
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
      <DocumentBar title="บันทึกเตือนความจำของฉัน" onAddonButtonClick={()=>{navigate('/alldocument/note')}}>
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
                  menu={menu}
                />
              )
            })}
        </>
      </DocumentBar>
      <Divider size = '10px'  />
      <DocumentBar title="เอกสารที่แชร์ร่วมกัน" onAddonButtonClick={()=>{navigate('/alldocument/sharefile')}}>
        <>
          <ShareModal
            customButton={
              <DocumentBlankBox
                icon={BsShareFill}
                size={'70px'}
                color={'#D1B1F0'}
                onClick={() => {}}
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
                  menu={menu}
                />
              )
            })}
        </>
      </DocumentBar>
      <DocumentBar title="แฟ้มเอกสารของฉัน" onAddonButtonClick={()=>{navigate('/alldocument/folder')}}>
        {myFolder
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
                menu={menu}
              />
            )
          })}
      </DocumentBar>
      <DocumentBar title="ไฟล์ของฉัน" onAddonButtonClick={()=>{navigate('/alldocument/file')}}>
        {myFile
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
                size={file.size}
                menu={menu}
              />
            )
          })}
      </DocumentBar>
    </Box>
  )


}


export default MyDocument

