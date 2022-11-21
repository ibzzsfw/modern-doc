import PopularBar from '@components/PopularBar'
import PopularBox from '@components/PopularBox'
import DocumentBar from '@components/DocumentBar'
import DocumentBox from '@components/DocumentBox'
import SearchBox from '@components/SearchBox'
import { VStack, Center } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import FileController from '@models/FileController'
import FolderController from '@models/FolderController'
import { useLoginDataStore } from '@stores/LoginDataStore'
import {useSearchBoxStore} from '@stores/SearchBoxStore'
import {  useNavigate } from 'react-router-dom'
import { useState } from 'react'
import File from '@models/File'

const Home = () => {
  const user = useLoginDataStore.getState().user
  const nevigete = useNavigate()
  const { search, setSearch, setSearchResult } = useSearchBoxStore()
  const [searchValue,setSearchValue] = useState('')

  const {
    data: latestFiles,
    isLoading: latestFilesLoading,
    error: latestFilesError,
  } = useQuery(['latestFiles', user?.id], FileController.getLatestFile)

  const {
    data: latestFolder,
    isLoading: latestFolderLoading,
    error: latestFolderError,
  } = useQuery(['latestFolder', user?.id], FolderController.getLatestFolder)

  console.log('folder',user?.id,latestFolder)

  if (latestFilesLoading || latestFolderLoading) return <div>Loading...</div>

  if (latestFilesError || latestFolderError) return <div>Error</div>

  if (latestFiles && latestFolder)
    return (
      <VStack marginTop="4px">
        <Center>
          <SearchBox
          
          onSearchClick={(values)=>{
            if(values !== ''){
              setSearch(values)
            nevigete(`/search/${values}`)
            }   
          }}/>
        </Center>
        <PopularBar title="รายการยอดฮิต" url={'search'} >
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

        <DocumentBar title="แฟ้มล่าสุด" url="broo">
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

        <DocumentBar title="เอกสารล่าสุด" url="broo">
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
}

export default Home
