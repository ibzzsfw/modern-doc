import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import MenuProvider from '@components/MenuProvider'
import FileController from '@models/FileController'
import FolderController from '@models/FolderController'
import NoteController from '@models/NoteController'
import { useMutation } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdLeakRemove } from 'react-icons/md'
import { BsThreeDots, BsTrash, BsShareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import ConfirmationModal from '@components/ConfirmationModal'

type propsType = {
  type:
    | 'generatedFolder'
    | 'generatedFile'
    | 'uploadedFile'
    | 'sharedFile'
    | 'note'
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

const DocumentBox = ({
  type,
  id,
  isShared = false,
  title,
  amount,
  size,
  author,
  image,
  showNote,
  note,
  showMenu = false,
  colorBar,
  modifiedDate,
  createdDate,
  showDate,
  url,
}: propsType) => {
  const [editNote, setEditNote] = useState(false)
  const toast = useToast()
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

  let colorBarStyle = {
    width: '18px',
    height: '100%',
    position: 'absolute',
    right: '0px',
    top: '0px',
    borderRadius: '0px 8px 8px 0px',
    backgroundColor: colorBar,
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
    if (type === 'uploadedFile') {
      return '/assets/card_logo.png'
    }
    if (type === 'sharedFile') {
      return '/assets/shared_logo.png'
    }
    if (type === 'note') {
      return '/assets/note_logo.png'
    }
  }

  const getSubText = () => {
    if (showDate) {
      if (createdDate) {
        return `สร้างเมื่อ ${new Date(createdDate).toLocaleDateString('en-GB')}`
      }
      return 'ยังไม่ได้สร้าง'
    }
    if (type === 'generatedFolder') {
      return `${amount} เอกสาร`
    }
    if (type === 'generatedFile') {
      return `${size} MB`
    }
    if (type === 'uploadedFile') {
      return `${size} MB`
    }
    if (type === 'sharedFile') {
      return `ผู้สร้าง : ${author}`
    }
    if (type === 'note') {
      return `แก้ไขล่าสุดเมื่อ : ${new Date(modifiedDate).toLocaleDateString(
        'en-GB'
      )}`
    }
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

  /*const deleteNote = async (id : string) => {
    if (type === 'note') {
      await 
      window.location.reload()
    }

  }*/
  /*
  const getMenuItem = (): [] => {
    let menu = [
      {
        title: 'รายละเอียด',
        icon: <Icon as={GrDocumentText} />,
        onClick: () => {},
      },
      {
        title: `แก้ไข${getThaiName()}`,
        icon: <Icon as={AiOutlineEdit} />,
        onClick: () => {},
      },
      {
        title: 'ดาวน์โหลด',
        icon: <Icon as={GrDownload} />,
        onClick: () => {},
      },
    ]
    if (type === 'generatedFolder') {
      return [menu[1],menu[2]]
    }
    if (type === 'generatedFile') {
      return []
    }
    if (type === 'uploadedFile') {
      return []
    }
    if (type === 'sharedFile') {
      return []
    }
    if (type === 'note') {
      return []
    }
  }*/
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
      left="108px"
      top="36px"
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
      <Icon as={BsThreeDots} sx={threeDot} boxSize="18px" />
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
    <Box sx={layout}>
      {colorBar && <Box sx={colorBarStyle}></Box>}
      <Flex gap="30px" alignItems="center">
        {showMenu && menu}
        <Link to={getUrl()}>
          <Image src={getImageUrl()} sx={documentImage} />
        </Link>
        <Flex flexDirection="column">
          <Link to={getUrl()}>
            <Text sx={titleText}>{title}</Text>
            <Text sx={subText}>{getSubText()}</Text>
          </Link>
        </Flex>
      </Flex>

      {showNote && (
        <Box marginTop="18px">
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
              }

              setEditNote(false)
            }}
            onReset={(value) => {
              setEditNote(false)
            }}
          >
            <Form>
              <Field name="content">
                {({ field, form }: any) => (
                  <Textarea
                    name="content"
                    {...field}
                    {...textareaLayout}
                    disabled={!editNote}
                  />
                )}
              </Field>
              <br />
              <br />
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
            </Form>
          </Formik>
        </Box>
      )}
      {deleteModal}
      {sharedModal}
      {unsharedModal}
    </Box>
  )
}

export default DocumentBox

let textareaLayout = {
  height: '80px',
  border: '2px solid',
  borderColor: '#E2E8F0',
  borderRadius: '8px',
  padding: '4px 12px',
  fontSize: '14px',
  color: 'accent.gray',
}
let threeDot = {
  position: 'absolute',
  top: '10px',
  right: '20px',
  color: 'accent.black',
}

/** <Editable
            defaultValue={note}
            
          >
            <EditablePreview />
            <EditableTextarea _focusVisible={{ boxShadow: 'none' }} />
            {EditableControls}
            <Input as = {EditableInput}/>
          </Editable> */
