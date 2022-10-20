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

const MyDocument = () => {
  let layout = {
    backgroundColor: 'background.gray',
    color: 'accent.black',
    width: '100%',
  }

  return (
    <Box sx={layout}>
      <Flex alignItems="center" justifyContent="space-between" marginBottom='30px'>
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
          type="sharedFile"
          title="รักษาดินแดน"
          author="Wang Junkai"
        />
        <DocumentBox
          type="sharedFile"
          title="พาร์สปอร์ต"
          author="Yi yangqianxi"
        />
        <DocumentBox type="sharedFile" title="ทะเบียนบ้าน" author="Wang yuan" />
      </DocumentBar>
      <DocumentBar title="แฟ้มเอกสารของฉัน">
        <DocumentBox type="generatedFolder" title="รักษาดินแดน" amount={9} />
        <DocumentBox type="generatedFolder" title="รักษาดินแดน" amount={9} />
        <DocumentBox type="generatedFolder" title="รักษาดินแดน" amount={9} />
      </DocumentBar>
      <DocumentBar title="ไฟล์ของฉัน">
        <DocumentBox type="uploadedFile" title="รักษาดินแดน" size={12} />
        <DocumentBox type="uploadedFile" title="รักษาดินแดน" size={5.7} />
        <DocumentBox type="uploadedFile" title="รักษาดินแดน" size={7} />
      </DocumentBar>
    </Box>
  )
}

export default MyDocument
