import {
  Badge,
  Box,
  Flex,
  SimpleGrid,
  HStack,
  Image,
  Text,
  Editable,
  EditablePreview,
  EditableTextarea,
  GridItem,
  Center,
  useDisclosure,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useToast,
  Textarea,
  ButtonGroup,
} from '@chakra-ui/react'
import MenuProvider from '@components/MenuProvider.component'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdLeakRemove } from 'react-icons/md'
import { BsThreeDots, BsTrash, BsShareFill } from 'react-icons/bs'
import { useState } from 'react'
import FileController from '@view-models/FileController'
import FolderController from '@view-models/FolderController'
import NoteController from '@view-models/NoteController'
import { useMutation } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
type propsType = {
  type:
    | 'generatedFolder'
    | 'generatedFile'
    | 'uploadedFile'
    | 'sharedFile'
    | 'userFreeUploadFile'
    | 'note'
    | undefined
  id: string
  isShared?: boolean
  title: string
  amount?: number
  size?: number
  author?: string
  image?: string
  showMenu?: boolean
  showNote?: boolean
  note?: string
  colorBar?: string
  createdDate?: Date
  modifiedDate?: Date
  showDate?: boolean
  url?: string
}

const TableListItem = ({
  type,
  id,
  isShared = false,
  title,
  image,
  showNote,
  note,
  showMenu = false,
  modifiedDate,
  createdDate,
  showDate,
}: propsType) => {
  const toast = useToast()

  const getImageUrl = () => {
    if (image) {
      return image
    }
    if (type === 'generatedFolder') {
      return '/assets/folder_logo.png'
    }
    if (type === 'generatedFile') {
      return '/assets/file_logo.png'
    }
    if (type === 'uploadedFile' || type === 'userFreeUploadFile') {
      return '/assets/card_logo.png'
    }
    if (type === 'sharedFile') {
      return '/assets/shared_logo.png'
    }
    if (type === 'note') {
      return '/assets/note_logo.png'
    }
  }

  const getThaiName = (): string => {
    if (type === 'generatedFolder') {
      return 'แฟ้ม'
    }
    if (type === 'generatedFile') {
      return 'เอกสาร'
    }
    if (type === 'uploadedFile') {
      return 'เอกสาร'
    }
    if (type === 'sharedFile') {
      return 'เอกสาร'
    }
    return 'บันทึก'
  }

  const getUrl = (): string => {
    if (type === 'generatedFolder') {
      return `/folder/${id}`
    }
    if (type === 'generatedFile') {
      return `/file/1/${id}`
    }
    if (type === 'uploadedFile') {
      return `/file/2/${id}`
    }
    if (type === 'sharedFile') {
      return `/file/3/${id}`
    }
    return ''
  }

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()
  const {
    isOpen: isOpenShared,
    onOpen: onOpenShared,
    onClose: onCloseShared,
  } = useDisclosure()
  const {
    isOpen: isOpenUnshared,
    onOpen: onOpenUnshared,
    onClose: onCloseUnshared,
  } = useDisclosure()
  const [editNote, setEditNote] = useState(false)

  const deleteNote = useMutation(
    (id: string | undefined) => {
      return NoteController.deleteNoteById(id)
    },
    {
      onSuccess: () => {
        toast({
          title: 'ลบบันทึกสำเร็จ',
          status: 'success',
          description: `ลบ${title}สำเร็จ`,
          duration: 3000,
        })
        window.location.reload()
      },
      onError: (error: any) => {
        toast({
          title: 'ลบบันทึกไม่สำเร็จ',
          description: error.message,
          status: 'error',
          duration: 3000,
        })
      },
    }
  )
  const editFileNote = useMutation(
    (value: {
      content: string
      type: string | undefined
      id: string | undefined
    }) => {
      return FileController.editNote(value.content, value.type, value.id)
    },
    {
      onSuccess: () => {
        toast({
          title: 'แก้ไขบันทึกสำเร็จ',
          description: `แก้ไขบันทึกสำเร็จ`,
          status: 'success',
          duration: 5000,
        })
      },
      onError: (error: any) => {
        toast({
          title: 'แก้ไขบันทึกไม่สำเร็จ',
          description: `${error.massage}`,
          status: 'error',
          duration: 5000,
        })
      },
    }
  )

  const editFolderNote = useMutation(
    (value: { content: string; id: string | undefined }) => {
      return FolderController.editNote(value.content, value.id)
    },
    {
      onSuccess: () => {
        toast({
          title: 'แก้ไขบันทึกสำเร็จ',
          description: `แก้ไขบันทึกสำเร็จ`,
          status: 'success',
          duration: 5000,
        })
      },
      onError: (error) => {
        toast({
          title: 'แก้ไขบันทึกไม่สำเร็จ',
          description: `${error}`,
          status: 'error',
          duration: 5000,
        })
      },
    }
  )

  const updateFreeNote = useMutation(
    (value: { heading: string; content: string; id: string | undefined }) => {
      return NoteController.editNote(value.heading, value.content, value.id)
    },
    {
      onSuccess: () => {
        ;async () => {
          await toast({
            title: 'แก้ไขบันทึกสำเร็จ',
            status: 'success',
            description: `แก้ไข${title}สำเร็จ`,
            duration: 3000,
          })
          await window.location.reload()
        }
      },
      onError: (error: any) => {
        toast({
          title: 'แก้ไขบันทึกไม่สำเร็จ',
          description: error,
          status: 'error',
          duration: 3000,
        })
      },
    }
  )

  let menu = (
    <MenuProvider
      left="100px"
      top="-30px"
      menusList={[
        [
          {
            title: `แก้ไขบันทึก`,
            icon: <Icon as={AiOutlineEdit} />,
            onClick: () => {
              setEditNote(true)
            },
          },
        ],
        [
          {
            title: `ลบ${getThaiName()}`,
            icon: <Icon as={BsTrash} color="accent.red" />,
            onClick: () => {
              onOpenDelete()
            },
            style: {
              color: 'accent.red',
            },
          },
        ],
        [
          {
            title: isShared ? 'ยกเลิกการแชร์' : 'แชร์เอกสาร',
            icon: isShared ? (
              <Icon as={MdLeakRemove} />
            ) : (
              <Icon as={BsShareFill} />
            ),
            onClick: () => {
              isShared ? onOpenUnshared() : onOpenShared()
            },
          },
        ],
      ].slice(0, type === 'sharedFile' || type === 'uploadedFile' ? 3 : 2)}
    >
      <Icon as={BsThreeDots} sx={menuList} boxSize="18px" />
    </MenuProvider>
  )

  let deleteModal = (
    <Modal
      isOpen={isOpenDelete}
      onClose={onCloseDelete}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ลบ{getThaiName()}</ModalHeader>
        <ModalBody>
          คุณต้องการลบ <Text as="b">{title}</Text> หรือไม่
        </ModalBody>
        <ModalFooter>
          <Flex gap="22px">
            <Button variant="outline" onClick={onCloseDelete}>
              ยกเลิก
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={async () => {
                if (type === 'note') {
                  deleteNote.mutate(id)
                  onCloseDelete()
                } else {
                  await FileController.deleteFile(type, id)
                  onCloseDelete()
                }
              }}
            >
              ลบ
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  let sharedModal = (
    <Modal
      isOpen={isOpenShared}
      onClose={onCloseShared}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>แชร์เอกสาร</ModalHeader>
        <ModalBody>
          คุณต้องการแชร์เอกสาร <Text as="b">{title}</Text> หรือไม่
        </ModalBody>
        <ModalFooter>
          <Flex gap="22px">
            <Button variant="outline" onClick={onCloseShared}>
              ยกเลิก
            </Button>
            <Button
              variant="solid"
              sx={submitButton}
              colorScheme="red"
              onClick={async () => {
                await FileController.shareFile(type, id)
                onCloseShared()
              }}
            >
              แชร์
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  let unsharedModal = (
    <Modal
      isOpen={isOpenUnshared}
      onClose={onCloseUnshared}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ยกเลิกแชร์เอกสาร</ModalHeader>
        <ModalBody>
          คุณต้องการยกเลิกแชร์เอกสาร <Text as="b">{title}</Text> หรือไม่
        </ModalBody>
        <ModalFooter>
          <Flex gap="22px">
            <Button variant="outline" onClick={onCloseUnshared}>
              ยกเลิก
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={async () => {
                await FileController.unshareFile(type, id)
                onCloseUnshared()
              }}
            >
              ยกเลิกการแชร์
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  return (
    <Box sx={boxLayout} alignItems="center" margin="auto">
      <SimpleGrid columns={10} alignItems="center" minHeight="110px">
        <GridItem colSpan={3}>
          <HStack spacing="10px">
            <Image src={getImageUrl()} sx={documentImage} />
            <Flex direction="column">
              <Link to={getUrl()}>
                <Text sx={titleText}>{title}</Text>
                <Text sx={subText}>{/*getSubText()*/} </Text>
              </Link>
            </Flex>
          </HStack>
        </GridItem>
        <GridItem colSpan={3}>
          <Center>
            <Badge
              colorScheme="blue"
              fontSize="16px"
              textAlign="center"
              margin="auto"
            >
              {showDate
                ? `สร้างเมื่อ ${new Date(createdDate ?? '').toLocaleDateString(
                    'en-GB'
                  )}`
                : `แก้ไขล่าสุดเมื่อ ${new Date(modifiedDate ?? '').toLocaleDateString(
                    'en-GB'
                  )}`}
            </Badge>
          </Center>
        </GridItem>

        <GridItem colSpan={3}>
          {showNote && (
            <Box textAlign="center" height="100%">
              <Formik
                initialValues={{ content: note || '' }}
                onSubmit={(value: { content: string }) => {
                  switch (type) {
                    case 'note':
                      updateFreeNote.mutate({
                        heading: title,
                        content: value.content,
                        id: id,
                      })
                      break
                    case 'generatedFolder':
                      editFolderNote.mutate({
                        content: value.content,
                        id: id,
                      })
                      break
                    case 'generatedFile':
                      editFileNote.mutate({
                        content: value.content,
                        type: type,
                        id: id,
                      })
                      break
                    case 'userFreeUploadFile':
                      editFileNote.mutate({
                        content: value.content,
                        type: type,
                        id: id,
                      })
                      break
                    case 'sharedFile':
                      editFileNote.mutate({
                        content: value.content,
                        type: type,
                        id: id,
                      })
                      break
                    case 'uploadedFile':
                      editFileNote.mutate({
                        content: value.content,
                        type: type,
                        id: id,
                      })
                      break
                  }

                  setEditNote(false)
                }}
                onReset={(value) => {
                  setEditNote(false)
                }}
              >
                <Form>
                  <HStack sx={{ 'text-align': 'center' }}>
                    <Field name="content">
                      {({ field, form }: any) => (
                        <Textarea
                          name="content"
                          {...field}
                          sx={noteText}
                          disabled={!editNote}
                          resize={!editNote ? 'none' : 'vertical'}
                        />
                      )}
                    </Field>
                    {editNote && (
                      <ButtonGroup
                        justifyContent="flex-end"
                        alignItems="center"
                        width="100%"
                        size="sm"
                      >
                        <Button type="reset" variant="outline">
                          ยกเลิก
                        </Button>
                        <Button type="submit" colorScheme="blue">
                          บันทึก
                        </Button>
                      </ButtonGroup>
                    )}
                  </HStack>
                </Form>
              </Formik>
            </Box>
          )}
        </GridItem>
        <GridItem colSpan={1}>
          <Box position="relative">{showMenu && menu}</Box>
        </GridItem>
      </SimpleGrid>
      {deleteModal}
      {sharedModal}
      {unsharedModal}
    </Box>
  )
}

export default TableListItem

let layout = {
  width: '320px',
  boxShadow: '5px 5px 3px -2px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  backgroundColor: 'background.white',
  position: 'relative',
  padding: '20px',
  cursor: 'pointer',
  transition: 'all 0.1s ease-in-out',
  _hover: {
    cursor: 'pointer',
    boxShadow: '10px 10px 7px -5px rgba(0, 0, 0, 0.2)',
    transform: 'translate(-2px, -2px)',
  },
}

let boxLayout = {
  width: '95%',
  minHeight: '110px',
  backgroundColor: 'accent.white',
  borderColor: 'accent.gray',
  borderRadius: '8px',
  boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.1s ease-in-out',
  _hover: {
    cursor: 'pointer',
    boxShadow: '10px 10px 7px -5px rgba(0, 0, 0, 0.2)',
    transform: 'translate(-2px, -2px)',
  },
}

let documentImage = {
  width: '60px',
}

let titleText = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'accent.black',
}

let subText = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: 'accent.gray',
}

let menuList = {
  position: 'absolute',
  top: '-11px',
  right: '35',
  color: 'accent.black',
}

let submitButton = {
  height: '40px',
  backgroundColor: 'accent.blue',
  color: 'white',
  margin: 'auto',
  _hover: {
    backgroundColor: 'hover.blue',
  },
  _active: {
    backgroundColor: 'hover.blue',
  },
}
let textareaLayout = {
  height: '80px',
  border: '2px solid',
  borderColor: '#E2E8F0',
  borderRadius: '8px',
  padding: '4px 12px',
  fontSize: '14px',
  color: 'accent.gray',
}

let noteText = {
  fontSize: '14px',
  color: 'accent.gray',
}