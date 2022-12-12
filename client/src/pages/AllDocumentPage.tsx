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
import FileController from '@models/FileController'
import FolderController from '@models/FolderController'
import NoteController from '@models/NoteController'

import { useEffect } from 'react'
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
  const [sortMenu, setSortMenu] = useState<{
    sort: string | string[]
    order: string | string[]
  }>({ sort: '', order: '' })
  const [documents, setDocuments] = useState([])
  const [data, setData] = useState([])
  const [userFreeUploadFiles, setUserFreeUploadFiles] = useState([])

  useEffect(() => {
    if (category === 'note') {
      NoteController.getLastestNote().then((res) => {
        setData(res)
      })
    }
    if (category === 'folder') {
      FolderController.getLatestFolder().then((res) => {
        setData(res)
      })
    } else {
      FileController.getLatestFile(category).then((res) => {
        setData(res)
      })
      FileController.getLatestFile('userFreeUploadFile').then((res) => {
        setUserFreeUploadFiles(res)
      })
    }
  }, [category])

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
  const sorting = (option: {
    sort: string | string[]
    order: string | string[]
  }) => {
    let sorted: any = [...documents]
    switch (option.order) {
      case 'ASC':
        sorted = [...documents].sort((a, b) =>
          a[option.sort].toLowerCase() > b[option.sort].toLowerCase() ? 1 : -1
        )
        setData(sorted)
        break
      case 'DESC':
        sorted = [...documents].sort((a, b) =>
          a[option.sort].toLowerCase() < b[option.sort].toLowerCase() ? 1 : -1
        )
        setData(sorted)
        break
    }
  }*/ /*
  const multipleSorting = (values: String | String[]) => {
    let sorted: any = [...documents]
    sorted = [...documents].sort((a, b) => (a[values] < b[values] ? 1 : -1))
    return
  }
*/
  const getType = (category: string | undefined) => {
    switch (category) {
      case 'note':
        return 'note'
      case 'sharefile':
        return 'sharedFile'
      case 'folder':
        return 'generatedFolder'
      case 'generatedFile':
        return 'generatedFile'
      case 'uploadedFile':
        return 'uploadedFile'
      case 'userFreeUploadFile':
        return 'uploadedFile'
    }
  }

  const getThaiName = (category: string | undefined) => {
    switch (category) {
      case 'note':
        return 'บันทึกเตือนความจำของฉัน'
      case 'sharefile':
        return 'เอกสารที่แชร์ร่วมกัน'
      case 'folder':
        return 'แฟ้มเอกสารของฉัน'
      case 'generatedFile':
        return 'ไฟล์ของฉัน'
      case 'uploadedFile':
        return 'เอกสารที่อัปโหลด'
    }
  }

  console.log('data', data)

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
                  <MenuItemOption value="modifiedDate">
                    วันที่แก้ไขล่าสุด
                  </MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup
                  defaultValue=""
                  title="เรียงลำดับจาก"
                  type="radio"
                  onChange={(value) => {
                    setSortMenu({ sort: sortMenu.sort, order: value })
                    console.log(value)
                    
                  }}
                >
                  <MenuItemOption value="ASC">
                    {sortMenu.sort === 'title' ? 'ก - ฮ' : 'เก่าสุด - ใหม่สุด'}
                  </MenuItemOption>
                  <MenuItemOption value="DESC">
                    {sortMenu.sort === 'title' ? 'ฮ - ก' : 'ใหม่สุด - เก่าสุด'}
                  </MenuItemOption>
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

        <Frame view={view} title={getThaiName(category)}>
          {data.map((file: any) => {
            return view === 'box' ? (
              <DocumentBox
                id={file.id}
                type={getType(category)}
                showMenu={true}
                showNote
                note={file.note ?? file.content}
                title={file.officialName ?? file.heading}
                isShared={file.isShared}
                showDate
                modifiedDate={
                  (getType(category) === 'note') && new Date(file.modifiedDate)
                }
                createdDate={
                  (getType(category) !== 'note') && new Date(file.date)
                }
                amount={
                  getType(category) !== 'note' &&
                  getType(category) !== 'sharedFile' &&
                  file.amount
                }
                author={
                  getType(category) === 'note'
                    ? file.autor
                    : getType(category) === 'sharedFile'
                    ? file.firstName + ' ' + file.lastName
                    : null
                }
              />
            ) : (
              <TableListItem
              id={file.id}
              type={getType(category)}
              showMenu={true}
              showNote
              note={file.note ?? file.content}
              title={file.officialName ?? file.heading}
              isShared={file.isShared}
              showDate
              modifiedDate={
                (getType(category) === 'note') && new Date(file.modifiedDate)
              }
              createdDate={
                (getType(category) !== 'note') && new Date(file.createdDate)
              }
              amount={
                getType(category) !== 'note' &&
                getType(category) !== 'sharedFile' &&
                file.amount
              }
              author={
                getType(category) === 'note'
                  ? file.autor
                  : getType(category) === 'sharedFile'
                  ? file.firstName + ' ' + file.lastName
                  : null
              }
                
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
