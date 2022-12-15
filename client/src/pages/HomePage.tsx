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
import { useSearchBoxStore } from '@stores/SearchBoxStore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import File from '@models/File'

const Home = () => {
  const user = useLoginDataStore.getState().user
  const navigate = useNavigate()
  const { search, setSearch, setSearchResult } = useSearchBoxStore()
  const [searchValue, setSearchValue] = useState('')

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

  console.log('folder', user?.id, latestFolder)

  if (latestFilesLoading || latestFolderLoading) return <div>Loading...</div>

  if (latestFilesError || latestFolderError) return <div>Error</div>

  console.log('user', user)

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
          {getStaticList.map((item, index) => {
            return (
              <PopularBox key={index} title={item.title} image={item.image} />
            )
          })}
        </PopularBar>

        <DocumentBar
          title="แฟ้มล่าสุด"
          onAddonButtonClick={() => {
            navigate('/alldocument/generatedFile')
          }}
        >
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

        <DocumentBar
          title="เอกสารล่าสุด"
          onAddonButtonClick={() => {
            navigate('/alldocument/folder')
          }}
        >
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

const getStaticList = [
  {
    title: 'รด',
    image:
      'http://mstc23.kku.ac.th/pluginfile.php/46889/course/overviewfiles/Handbook_AR_NST_1-1.jpg',
  },
  {
    title: 'คนพิการ',
    image:
      'https://image.bestreview.asia/wp-content/uploads/2020/06/วิธีรับเงิน-เยียวยาคนพิการ-1000-บาท-โควิด19.jpg',
  },
  {
    title: 'ใบลา',
    image:
      'data:image/jpeg;base64,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',
  },
  {
    title: 'ปพ',
    image:
      'https://campus.campus-star.com/app/uploads/2015/12/นิยามของคำว่า-นักเรียน-1.jpg',
  },
  {
    title: 'มจธ',
    image:
      'https://pr.kmutt.ac.th/pr2/wp-content/uploads/2019/03/KMUTT01-4288x2144.jpg',
  },
]
