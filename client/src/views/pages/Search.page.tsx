import {
  Center,
  Checkbox,
  Flex,
  Text,
  VStack
} from '@chakra-ui/react'
import DocumentBox from '@components/DocumentBox.component'
import SearchBox from '@components/SearchBox.component'
import { useQuery } from '@tanstack/react-query'
import SearchPageViewController from '@view-controllers/Search.page.viewcontroller'
import FileController from '@view-models/FileController'
import FolderController from '@view-models/FolderController'
import { useEffect } from 'react'

const SearchPage = () => {

  const viewController = new SearchPageViewController()

  const { search, setSearch } = viewController.searchModel
  const [showFile, setShowFile] = viewController.showFileState
  const [showFolder, setShowFolder] = viewController.showFolderState

  const { data: folderResult, refetch: refetchFolder } = useQuery(
    ['searchFolder', search],
    () => FolderController.search(search)
  )

  const { data: fileResult, refetch: refetchFile } = useQuery(
    ['searchFile', search],
    () => FileController.search(search)
  )

  useEffect(() => {
    refetchFile()
    refetchFolder()
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
                {folderResult ? (
                  folderResult.map((folder: any) => {
                    return (
                      <DocumentBox
                        id={folder.id}
                        title={folder.officialName}
                        type={folder.type}
                        showDate={true}
                        createdDate={folder.dateUpload}
                        colorBar={folder.colorBar}
                      />
                    )
                  })
                ) : (
                  <Text>ไม่พบแฟ้ม</Text>
                )}
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
                {fileResult != null ? (
                  fileResult.map((file: any) => {
                    return (
                      <DocumentBox
                        id={file.id}
                        title={file.officialName ?? file.name}
                        type={file.type}
                        showDate={true}
                        createdDate={file.dateUpload}
                        colorBar={file.colorBar}
                      />
                    )
                  })
                ) : (
                  <Text>ไม่พบเอกสาร</Text>
                )}
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
