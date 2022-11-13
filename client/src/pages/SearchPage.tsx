import {
  Center,
  Checkbox,
  Flex,
  Highlight,
  Text,
  VStack
} from '@chakra-ui/react'
import DocumentBox from '@components/DocumentBox'
import SearchBox from '@components/SearchBox'
import { useSearchDocumentStore } from '@stores/SearchDocument'
import { useEffect, useState } from 'react'

const SearchPage = () => {
  const state = [1, 2, 3, 4]

  const { search, setSearch, searchResult } = useSearchDocumentStore()
  const [showFile, setShowFile] = useState(true)
  const [showFolder, setShowFolder] = useState(true)

  let layout = {
    padding: '24px 0',
    gap: '32px',
    flexDirection: 'column',
    width: '1280px',
  }

  let childrenFlex = {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '32px',
  }

  return (
    <VStack marginTop="4px">
      <VStack align="start">
        <Center>
          <SearchBox setValue={search} />
          {/* งง ไม่เข้าใจบันทัดบน */}
        </Center>
      </VStack>
      <Center>
        <VStack align="start">
          <Flex sx={layout}>
            <Checkbox defaultChecked onChange={(e) => setShowFolder(e.target.checked)}>
              <Text
                fontSize="18px"
                fontWeight="bold"
                margin={['auto', null, null, 0]}
              >
                ผลการค้นหาแฟ้ม
              </Text>
            </Checkbox>
            {
              showFolder &&
              <Flex sx={childrenFlex}>
                <DocumentBox
                  title="จ้างงานคนพิการ"
                  type="generatedFolder"
                  showDate
                  colorBar="#FF9898"
                />
                <DocumentBox
                  title="จ้างงานคนพิการ"
                  type="generatedFolder"
                  showDate
                  createdDate={new Date('12/08/2021')}
                />
                <DocumentBox
                  title="ขึ้นทะเบียนคนพิการ"
                  type="generatedFolder"
                  showDate
                  createdDate={new Date('12/08/2021')}
                />
              </Flex>
            }
          </Flex>

          <Flex sx={layout}>
            <Checkbox defaultChecked onChange={(e) => setShowFile(e.target.checked)}>
              <Text
                fontSize="18px"
                fontWeight="bold"
                margin={['auto', null, null, 0]}
              >
                ผลการค้นหาเอกสาร
              </Text>
            </Checkbox>
            {
              showFile ?
                <Flex sx={childrenFlex}>
                  <DocumentBox
                    title="หนังสือมอบอำนาจ"
                    type="generatedFile"
                    showDate
                    colorBar="#FF9898"
                  />
                  <DocumentBox
                    title="เอกสารผู้ดูแลคนพิการ"
                    type="generatedFile"
                    showDate
                    createdDate={new Date('12/08/2021')}
                  />
                  <DocumentBox
                    title="บัตรคนพิการ"
                    type="uploadedFile"
                    showDate
                    createdDate={new Date('12/08/2021')}
                    colorBar="#FF9898"
                  />
                  <DocumentBox
                    title="จ้างงานคนพิการ"
                    type="generatedFile"
                    showDate
                    createdDate={new Date('12/08/2021')}
                    colorBar="#FF9898"
                  />
                  <DocumentBox
                    title="ขึ้นทะเบียนคนพิการ"
                    type="generatedFile"
                    showDate
                    createdDate={new Date('12/08/2021')}
                    colorBar="#FF9898"
                  />
                </Flex>
                : <Text>กดเพื่อแสดงผลการค้นหา</Text>
            }
          </Flex>
        </VStack>
      </Center>
    </VStack>
  )
}

export default SearchPage
