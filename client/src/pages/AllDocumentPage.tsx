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
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleSort = (data: any) => {
    const sortedData = data.sort((a: any, b: any) => {
      if (sortBy === 'name') {
        if (sortOrder === 'asc') {
          return a.officialName
            ? a.officialName.localeCompare(b.name)
            : a.heading.localeCompare(b.heading)
        } else {
          return b.officialName
            ? b.officialName.localeCompare(a.name)
            : b.heading.localeCompare(a.heading)
        }
      } else {
        if (sortOrder === 'asc') {
          return a.date
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(a.modifiedDate).getTime() -
                new Date(b.modifiedDate).getDate()
        } else {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
      }
    })
    setData(sortedData)
  }

  useEffect(() => {
    if (category === 'note') {
      NoteController.getLastestNote().then((res) => {
        handleSort(res)
      })
    } else if (category === 'folder') {
      FolderController.getLatestFolder().then((res) => {
        handleSort(res)
      })
    } else if (category === 'uploadedFile') {
      FileController.getLatestFile(category).then((res) => {
        FileController.getLatestFile('userFreeUploadFile').then((res2) => {
          const merged = [...res, ...res2]
          console.log('merged', merged)
          handleSort(merged)
        })
      })
    } else {
      FileController.getLatestFile(category).then((res) => {
        handleSort(res)
      })
    }
    console.log('data', sortBy, sortOrder, data)
  }, [category, sortBy, sortOrder])

  useEffect(() => {
    let temp = data
    if (category !== 'note')
      temp = temp.filter((item: any) => item.officialName.includes(search))
    else
      temp = temp.filter(
        (item: any) =>
          item.heading.includes(search) || item.content.includes(search)
      )
    setData(temp)
  }, [search])

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
                    setSortBy(value as any)
                    console.log(sortMenu)
                  }}
                >
                  <MenuItemOption value="name">ชื่อ</MenuItemOption>
                  <MenuItemOption value="date">
                    วันที่แก้ไขล่าสุด
                  </MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup
                  defaultValue=""
                  title="เรียงลำดับจาก"
                  type="radio"
                  onChange={(value) => {
                    setSortOrder(value as any)
                    console.log(value)
                  }}
                >
                  <MenuItemOption value="asc">
                    {sortBy === 'name' ? 'ก - ฮ' : 'เก่าสุด - ใหม่สุด'}
                  </MenuItemOption>
                  <MenuItemOption value="desc">
                    {sortBy === 'name' ? 'ฮ - ก' : 'ใหม่สุด - เก่าสุด'}
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
                type={file.type ?? getType(category)}
                showMenu={true}
                showNote
                note={file.note ?? file.content}
                title={file.officialName ?? file.heading}
                isShared={file.isShared}
                showDate={getType(category) !== 'note'}
                modifiedDate={
                  getType(category) === 'note' && new Date(file.modifiedDate)
                }
                createdDate={
                  getType(category) !== 'note' && new Date(file.date)
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
                showDate={getType(category) !== 'note'}
                modifiedDate={
                  getType(category) === 'note' && new Date(file.modifiedDate)
                }
                createdDate={
                  getType(category) !== 'note' && new Date(file.date)
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
