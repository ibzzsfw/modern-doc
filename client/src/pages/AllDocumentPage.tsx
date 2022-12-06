import {
  Icon,
  Button,
  Box,
  Flex,
  Select,
  VStack,
  IconButton,
  Divider,
  ButtonGroup,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
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
import Frame from '@components/Frame'
import { IoChevronDownOutline, IoChevronForwardOutline } from 'react-icons/io5'

const AllDocumentPage = () => {
  const { category } = useParams<{ category: string }>()
  const [view, setView] = useState<'box' | 'table'>('box')
  const [search, setSearch] = useState('')
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
      // left={toggleView ? '108px' : '-80px'}
      // top={toggleView ? '36px' : '20px'}
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
        sx={view === 'box' ? menuBlock : menuList}
        boxSize="18px"
      />
    </MenuProvider>
  )

  const sorting = (option: String | String[]) => {
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
      <VStack gap="30px">
        <Flex width="100%" justifyContent="space-between">
          <SearchBox
            value={search}
            onSearchClick={(params) => {
              setSearch(params)
            }}
          />

          <Flex gap="10px">
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                variant="outline"
                rightIcon={<IoChevronDownOutline />}
              >
                เรียงลำดับ
              </MenuButton>
              <MenuList minWidth="240px">
                <MenuOptionGroup
                  defaultValue=""
                  title="Order"
                  type="radio"
                  onChange={(value) => {
                    sorting(value)
                  }}
                >
                  <MenuItemOption value="ASC">Ascending</MenuItemOption>
                  <MenuItemOption value="DESC">Descending</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup title="Country" type="checkbox">
                  <MenuItemOption value="email">Email</MenuItemOption>
                  <MenuItemOption value="phone">Phone</MenuItemOption>
                  <MenuItemOption value="country">Country</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>

            <ButtonGroup isAttached variant="outline">
              <IconButton
                isActive={view == 'box'}
                aria-label="Box view"
                icon={<AiOutlineAppstore />}
                onClick={() => setView('box')}
              />

              <IconButton
                isActive={view == 'table'}
                aria-label="Grid view"
                icon={<AiOutlineMenu />}
                onClick={() => setView('table')}
              />
            </ButtonGroup>
          </Flex>
        </Flex>

        <Frame view={view} title={category}>
          {documents
            .filter((file) => file.title.toLowerCase().includes(search))
            .map((file: any) => {
              return view === 'box' ? (
                <DocumentBox
                  id={file.id}
                  type={file.type}
                  title={file.title}
                  author={file.author}
                  showNote
                  menu={menu}
                />
              ) : (
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
        </Frame>
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
