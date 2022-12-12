import PopularBar from 'src/views/components/PopularBar.component'
import PopularBox from 'src/views/components/PopularBox.component'
import DocumentBar from 'src/views/components/DocumentBar.component'
import DocumentBox from 'src/views/components/DocumentBox.component'
import SearchBox from 'src/views/components/SearchBox.component'
import { VStack, Center } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import FileController from 'src/view-models/FileController'
import FolderController from 'src/view-models/FolderController'
import { useNavigate } from 'react-router-dom'
import HomePageViewController from '../view-controllers/HomePage.viewcontroller'

const Home = () => {

  const viewController = new HomePageViewController()

  const navigate = useNavigate()
  const user = viewController.getUser()
  const { search, setSearch, setSearchResult } = viewController.searchBoxStore
  const [searchValue, setSearchValue] = viewController.searchValueState

  const {
    data: latestFiles,
    isLoading: latestFilesLoading,
    error: latestFilesError,
  } = useQuery(['latestFiles', user?.id], async () => {
    return await FileController.getLatestFile('generatedFile')
  })

  const {
    data: latestFolder,
    isLoading: latestFolderLoading,
    error: latestFolderError,
  } = useQuery(['latestFolder', user?.id], FolderController.getLatestFolder)

  if (latestFilesLoading || latestFolderLoading) return <div>Loading...</div>

  if (latestFilesError || latestFolderError) return <div>Error</div>

  if (latestFiles && latestFolder)
    return (
      <VStack marginTop="4px">
        <Center>
          <SearchBox
            onSearchClick={(values) => {
              setSearch(values)
              navigate(`/search`)
            }}
          />
        </Center>
        <PopularBar title="รายการยอดฮิต" url={'search'}>
          <PopularBox
            title="เอกสารประกอบการสอน"
            image="https://trendwatchers.co/wp-content/uploads/2020/04/1_r_46B-6pUz9L0sq9fVuChA.jpeg"
          />
          <PopularBox
            title="การเรียนรู้"
            image="https://trendwatchers.co/wp-content/uploads/2020/04/1_r_46B-6pUz9L0sq9fVuChA.jpeg"
          />
          <PopularBox
            title="ฟังเพลง"
            image="https://trendwatchers.co/wp-content/uploads/2020/04/1_r_46B-6pUz9L0sq9fVuChA.jpeg"
          />
          <PopularBox
            title="ไลฟ์สไตล์"
            image="https://trendwatchers.co/wp-content/uploads/2020/04/1_r_46B-6pUz9L0sq9fVuChA.jpeg"
          />
          <PopularBox
            title="ที่ดิน"
            image="https://trendwatchers.co/wp-content/uploads/2020/04/1_r_46B-6pUz9L0sq9fVuChA.jpeg"
          />
        </PopularBar>

        <DocumentBar title="แฟ้มล่าสุด" onAddonButtonClick={() => {}}>
          {latestFolder.map((folder: any) => (
            <DocumentBox
              id={folder.id}
              title={folder.officialName}
              type="generatedFolder"
              createdDate={folder.date}
              showDate
            />
          ))}
        </DocumentBar>

        <DocumentBar title="เอกสารล่าสุด" onAddonButtonClick={() => {}}>
          {latestFiles?.map((file: any) => (
            <DocumentBox
              id={file.id}
              title={file.officialName}
              type={file.type ?? 'generatedFile'}
              showDate
              createdDate={new Date(file.date)}
            />
          ))}
        </DocumentBar>
      </VStack>
    )
  return <></>
}

export default Home
