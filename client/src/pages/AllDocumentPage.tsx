import {
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
} from '@chakra-ui/react'
import DocumentBox from '@components/DocumentBox'
import Frame from '@components/Frame'
import MenuProvider from '@components/MenuProvider'
import SearchBox from '@components/SearchBox'
import TableListItem from '@components/TableListItem'
import { useState } from 'react'
import {
  AiFillPrinter,
  AiOutlineAppstore,
  AiOutlineEdit,
  AiOutlineMenu,
} from 'react-icons/ai'
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { GrDocumentText, GrDownload } from 'react-icons/gr'
import { IoChevronDownOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'

const AllDocumentPage = () => {
  const { category } = useParams<{ category: string }>()
  const [view, setView] = useState<'box' | 'table'>('box')
  const [search, setSearch] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sortMenu, setSortMenu] = useState({ sort: '', order: '' })
  const [documents, setDocuments] = useState([])

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
            onClick: () => {
              onOpen()
            },
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
  /*
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
    
  }*/ /*
  const multipleSorting = (values: String | String[]) => {
    let sorted: any = [...documents]
    sorted = [...documents].sort((a, b) => (a[values] < b[values] ? 1 : -1))
    return
  }
*/
  let deleteModal = (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ลบสมาชิก</ModalHeader>
        <ModalBody>
          คุณต้องการลบสมาชิก ใช่หรือไม่
          <br />
          (เอกสารร่วมจะหายไปด้วย)
        </ModalBody>
        <ModalFooter>
          <Flex gap="22px">
            <Button variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={() => {
                //delete api
              }}
            >
              ลบ
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

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
                  type="radio"
                  title="เรียงลำดับด้วย"
                  onChange={(value) => {
                    setSortMenu({ sort: value, order: sortMenu.order })
                    console.log(sortMenu)
                  }}
                >
                  <MenuItemOption value="title">ชื่อ</MenuItemOption>
                  <MenuItemOption value="lastModified">
                    วันที่แก้ไขล่าสุด
                  </MenuItemOption>
                  <MenuItemOption value="dateCreate">
                    วันที่สร้าง
                  </MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup
                  defaultValue=""
                  title="เรียงลำดับจาก"
                  type="radio"
                  onChange={(value) => {
                    console.log(value)
                  }}
                >
                  <MenuItemOption value="ASC">{sortMenu.sort}</MenuItemOption>
                  <MenuItemOption value="DESC">{sortMenu.sort}</MenuItemOption>
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
                  showDate
                  menu={menu}
                />
              ) : (
                <TableListItem
                  id={file.id}
                  type={file.type}
                  title={file.title}
                  author={file.author}
                  showNote
                  showDate
                  menu={menu}
                />
              )
            })}
        </Frame>
        {deleteModal}
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
