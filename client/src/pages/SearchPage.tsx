import {
  Center,
  Checkbox,
  Flex,
  Highlight,
  Text,
  VStack,
} from '@chakra-ui/react'
import DocumentBox from '@components/DocumentBox'
import SearchBox from '@components/SearchBox'
import { useSearchBoxStore } from '@stores/SearchBoxStore'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
  const { search, setSearch, searchResult } = useSearchBoxStore()
  const [showFile, setShowFile] = useState(true)
  const [showFolder, setShowFolder] = useState(true)
  const keyword = useParams()
  const [files, setfiles] = useState([
    {
      id:"4",
      title:"หนังสือมอบอำนาจ",
      type:"generatedFile",
      colorBar:"#FF9898"
      
    }
    ,
    {id:"5",
    title:"เอกสารผู้ดูแลคนพิการ",
    type:"generatedFile",
    showDate:true,
    createdDate:new Date('12/08/2021')}
    ,
    {
    id:"6",
    title:"บัตรคนพิการ",
    type:"uploadedFile",
    showDate:true,
    createdDate:new Date('12/08/2021'),
    colorBar:"#FF9898"}
    ,
    
    {id:"7",
    title:"จ้างงานคนพิการ",
    type:"generatedFile",
    showDate:true,
    createdDate: new Date('12/08/2021'),
    colorBar:"#FF9898"
    },
    {
    id:"8",
    title:"ขึ้นทะเบียนคนพิการ",
    type:"generatedFile",
    showDate:true,
    createdDate:new Date('12/08/2021'),
    colorBar:"#FF9898"
    }
  ])
  const [folders, setFolders] = useState([
    {
      id: '1',
      title: 'จ้างงานคนพิการ',
      type: 'generatedFolder',
      colorBar: '#FF9898',
    },
  ])

  useEffect(() => {
    //------------- fetch data from server ----------------
    console.log('fetch by search', search)
  }, [search])

  return (
    <VStack marginTop="4px">
      <VStack align="start">
        <Center>
          <SearchBox
            value={search}
            onSearchClick={(values) => {
              setSearch(values)
            }}
          />
        </Center>
      </VStack>
      <Center>
        <VStack align="start">
          <Flex sx={layout}>
            <Checkbox
              defaultChecked
              onChange={(e) => setShowFolder(e.target.checked)}
            >
              <Text
                fontSize="18px"
                fontWeight="bold"
                margin={['auto', null, null, 0]}
              >
                ผลการค้นหาแฟ้ม
              </Text>
            </Checkbox>
            {showFolder ? (
              <Flex sx={childrenFlex}>
                {folders.map((folder: any) => {
                  return (
                    <DocumentBox
                      id= {folder.id}
                      title= {folder.title}
                      type= {folder.type}
                      showDate = {folder.showDate}
                      colorBar = {folder.colorBar}
                    />
                  )
                })}
              </Flex>
            ) : (
              <Text>กดเพื่อแสดงผลการค้นหาแฟ้ม</Text>
            )}
          </Flex>

          <Flex sx={layout}>
            <Checkbox
              defaultChecked
              onChange={(e) => setShowFile(e.target.checked)}
            >
              <Text
                fontSize="18px"
                fontWeight="bold"
                margin={['auto', null, null, 0]}
              >
                ผลการค้นหาเอกสาร
              </Text>
            </Checkbox>
            {showFile ? (
              <Flex sx={childrenFlex}>
               {files.map((file: any) => {
                return <DocumentBox
                id={file.id}
                title= {file.title}
                type={file.type}
                showDate = {file.showDate}
                colorBar= {file.colorBar}
                />
               })}
              </Flex>
            ) : (
              <Text>กดเพื่อแสดงผลการค้นหาเอกสาร</Text>
            )}
          </Flex>
        </VStack>
      </Center>
    </VStack>
  )
}

export default SearchPage

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





