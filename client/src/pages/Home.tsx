import PopularBar from '@components/PopularBar'
import PopularBox from '@components/PopularBox'
import DocumentBar from '@components/DocumentBar'
import DocumentBox from '@components/DocumentBox'
import SearchBox from '@components/SearchBox'
import { VStack, Center } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import FileController from '@models/FileController'
import { useLoginDataStore } from '@stores/LoginDataStore'
import File from '@models/File'

const Home = () => {
  const user = useLoginDataStore.getState().user

  const {
    data: latestFiles,
    isLoading: latestFilesLoading,
    error: latestFilesError,
  } = useQuery(['latestFiles', user?.id], FileController.getLatestFile)

  console.log(latestFiles)

  return (
    <VStack marginTop="4px">
      <Center>
        <SearchBox />
      </Center>
      <PopularBar title="รายการยอดฮิต" url="">
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
        <DocumentBox id="2" title="แฟ้มที่ 1" type="generatedFolder" showDate />
        <DocumentBox
          id="1"
          title="แฟ้มที่ 2"
          type="generatedFolder"
          showDate
          createdDate={new Date('12/08/2021')}
          colorBar="#abcedf"
        />
        <DocumentBox
          id="3"
          title="แฟ้มที่ 2"
          type="generatedFolder"
          showDate
          createdDate={new Date('12/08/2021')}
          colorBar="#FF9898"
        />
        <DocumentBox
          id="4"
          title="แฟ้มที่ 2"
          type="generatedFolder"
          showDate
          createdDate={new Date('12/08/2021')}
          colorBar="#FF9898"
        />
        <DocumentBox
          id="5"
          title="แฟ้มที่ 2"
          type="generatedFolder"
          showDate
          createdDate={new Date('12/08/2021')}
          colorBar="#FF9898"
        />
        <DocumentBox
          id="6"
          title="แฟ้มที่ 2"
          type="generatedFolder"
          showDate
          createdDate={new Date('12/08/2021')}
          colorBar="#FF9898"
        />
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
        {/* <DocumentBox id="7" title="แฟ้มที่ 1" type="generatedFile" showDate />
        <DocumentBox
          id="6"
          title="แฟ้มที่ 2"
          type="generatedFile"
          showDate
          createdDate={new Date('12/08/2021')}
          colorBar="#FF9898"
        />
        <DocumentBox
          id="6"
          title="แฟ้มที่ 2"
          type="generatedFile"
          showDate
          createdDate={new Date('12/08/2021')}
          colorBar="#FF9898"
        />
        <DocumentBox
          id="6"
          title="แฟ้มที่ 2"
          type="generatedFile"
          showDate
          createdDate={new Date('12/08/2021')}
          colorBar="#FF9898"
        />
        <DocumentBox
          id="6"
          title="แฟ้มที่ 2"
          type="generatedFile"
          showDate
          createdDate={new Date('12/08/2021')}
          colorBar="#FF9898"
        />
        <DocumentBox
          id="6"
          title="แฟ้มที่ 2"
          type="generatedFile"
          showDate
          createdDate={new Date('12/08/2021')}
          colorBar="#FF9898"
        /> */}
      </DocumentBar>
    </VStack>
  )
}

export default Home
