import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Input,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import SearchBox from '@components/SearchBox'
import DocumentBox from '@components/DocumentBox'
import DocumentBar from '@components/DocumentBar'
import MenuProvider from '@components/MenuProvider'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { GrDocumentText, GrDownload } from 'react-icons/gr'
import { AiFillPrinter, AiOutlineEdit } from 'react-icons/ai'

const MyDocument = () => {
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
        <SearchBox />
      </Flex>
      <DocumentBar title="เอกสารที่แชร์ร่วมกัน">
        <DocumentBox
          id="6"
          type="sharedFile"
          title="รักษาดินแดน"
          author="Wang Junkai"
          showNote
          menu={menu}
        />
        <DocumentBox
          id="6"
          type="sharedFile"
          title="พาร์สปอร์ต"
          author="Yi yangqianxi"
          showNote
          menu={menu}
        />
        <DocumentBox
          id="6"
          type="sharedFile"
          title="ทะเบียนบ้าน"
          author="Wang yuan"
          showNote
          menu={menu}
        />
      </DocumentBar>
      <DocumentBar title="แฟ้มเอกสารของฉัน">
        <DocumentBox
          id="6"
          type="generatedFolder"
          title="สมัครงานกับ TechLead"
          amount={9}
          image={
            'https://cdn.sanity.io/images/xeonec4d/production/fc4aef437fe8753e30757498e7baceb016de4c6c-300x250.png?w=1000'
          }
          showNote
          menu={menu}
        />
        <DocumentBox
          id="6"
          type="generatedFolder"
          title="รักษาดินแดน"
          amount={9}
          showNote
          menu={menu}
        />
        <DocumentBox
          id="6"
          type="generatedFolder"
          title="รักษาดินแดน"
          amount={9}
          showNote
          menu={menu}
        />
      </DocumentBar>
      <DocumentBar title="ไฟล์ของฉัน">
        <DocumentBox
          id="6"
          type="uploadedFile"
          title="รักษาดินแดน"
          size={12}
          showNote
          menu={menu}
        />
        <DocumentBox
          id="6"
          type="uploadedFile"
          title="รักษาดินแดน"
          size={5.7}
          showNote
          menu={menu}
        />
        <DocumentBox
          id="6"
          type="uploadedFile"
          title="รักษาดินแดน"
          size={7}
          showNote
          menu={menu}
        />
      </DocumentBar>
    </Box>
  )
}

export default MyDocument
