import { Icon, Button, Box, Flex, Select, VStack, Fade } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import TableList from '@components/TableList'
import TableListItem from '@components/TableListItem'
import MenuProvider from '@components/MenuProvider'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { GrDocumentText, GrDownload } from 'react-icons/gr'
import { AiFillPrinter, AiOutlineEdit } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import SearchBox from '@components/SearchBox'
import { AiOutlineMenu, AiOutlineAppstore } from 'react-icons/ai'
import DocumentBar from '@components/DocumentBar'
import DocumentBox from '@components/DocumentBox'
import { useSearchBoxStore } from '@stores/SearchBoxStore'

const AllDocumentPage = () => {
  const { category } = useParams<{ category: string }>()
  const [toggleView, setToggleView] = useState(true)
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState('')
  const [documents, setDocuments] = useState([
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

  let menu = (
    <MenuProvider
      left={toggleView ? '108px' : '-80px'}
      top={toggleView ? '36px' : '20px'}
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
      <Icon
        as={BsThreeDots}
        sx={toggleView ? menuBlock : menuList}
        boxSize="18px"
      />
    </MenuProvider>
  )

  const sorting = (option: String) => {
    let sorted: any = [...documents]
    switch (option) {
      case 'ASC':
        sorted = [...documents].sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        )
        setDocuments(sorted)
        break
      case 'DESC':
        sorted = [...documents].sort((a, b) =>
          a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
        )
        setDocuments(sorted)
        break
    }
    console.log(sorted)
  }

  return (
    <>
      <VStack>
        <Flex width="100%" justifyContent="space-between">
          <SearchBox
            value={search}
            onSearchClick={(params) => {
              setSearch(params)
            }}
          />

          <Flex gap="10px">
            <Select
              placeholder="เรียงลำดับ"
              variant="flushed"
              onChange={(e) => {
                sorting(e.target.value)
              }}
            >
              <option value="ASC">ASC</option>
              <option value="DESC">DSC</option>
            </Select>
            <Button
              rightIcon={toggleView ? <AiOutlineAppstore /> : <AiOutlineMenu />}
              variant="ghost"
              onClick={() => {
                setToggleView(!toggleView)
              }}
            >
              มุมมอง
            </Button>
          </Flex>
        </Flex>
        {toggleView ? (
          <DocumentBar title={category}>
            {documents
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
          </DocumentBar>
        ) : (
          <TableList title={category}>
            {documents
              .filter((file) => file.title.toLowerCase().includes(search))
              .map((file: any) => {
                return (
                  <TableListItem
                    id={file.id}
                    type={file.type}
                    title={file.title}
                    author={file.author}
                    showNote
                    menu={menu}
                  />
                )
              })}
          </TableList>
        )}
      </VStack>
    </>
  )
}

let menuList = {
  position: 'absolute',
  top: '0px',
  right: '0px',
  color: 'accent.black',
}

let menuBlock = {
  position: 'absolute',
  top: '10px',
  right: '20px',
  color: 'accent.black',
}

export default AllDocumentPage
