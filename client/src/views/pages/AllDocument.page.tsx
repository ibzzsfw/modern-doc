import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import DocumentBox from '@components/DocumentBox.component'
import Frame from '@components/Frame.component'
import SearchBox from '@components/SearchBox.component'
import TableListItem from '@components/TableListItem.component'
import FileController from '@view-models/FileController'
import FolderController from '@view-models/FolderController'
import NoteController from '@view-models/NoteController'
import { useEffect, useState } from 'react'
import {
  AiOutlineAppstore, AiOutlineMenu
} from 'react-icons/ai'
import { IoChevronDownOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'

const AllDocumentPage = () => {
  const { category } = useParams<{ category: string }>()
  const [view, setView] = useState<'box' | 'table'>('box')
  const [search, setSearch] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState([])
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
          handleSort(merged)
        })
      })
    }
    if (category === 'sharefile') {
      FileController.getLatestFile('sharedFile').then((res) => {
        handleSort(res)
      })
    } else {
      FileController.getLatestFile(category as string).then((res) => {
        handleSort(res)
      })
    }
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
              onClick={() => {}}
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

        <Frame view={view} title={getThaiName(category) ?? ''}>
          {data.map((file: any) => {
            return view === 'box' ? (
              <DocumentBox
                id={file.id}
                type={
                  category == 'sharefile'
                    ? 'sharedFile'
                    : file.type ?? getType(category)
                }
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
                  getType(category) !== 'note' && new Date(file.dateUpload)
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
                  getType(category) !== 'note' && new Date(file.dateUpload)
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